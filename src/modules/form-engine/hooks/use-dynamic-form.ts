"use client"

import { useState, useCallback } from 'react';

import type { UseDynamicFormOptions } from './use-dynamic-form.interface';
import type { DynamicFormContextValue } from '../context/dynamic-form-context.interface';
import {
    ValidationEngine,
    SchemaEngine,
    PayloadBuilder,
    VisibilityEngine
} from '../engines';
import { ObjectUtil } from '../utils';
import type { FormState, VerificationState } from '../interfaces';

/**
 * useDynamicForm is the main entry point and single source of truth 
 * for the Dynamic Form Engine V2.
 * 
 * It manages the complete lifecycle of a form, maintaining all 
 * runtime states (values, errors, touched fields, verification) 
 * in synchronization with the FormState interface.
 * 
 * The return value of this hook matches DynamicFormContextValue and 
 * can be passed directly to DynamicFormProvider without mapping.
 */
export const useDynamicForm = (options: UseDynamicFormOptions): DynamicFormContextValue => {
    const { schema, initialValues = {}, mode = 'CREATE', readonly = false } = options;

    const schemaDefaults = SchemaEngine.buildDefaultValues(schema);

    const mergedValues = {
        ...schemaDefaults,
        ...initialValues
    };
    

    const [values, setValuesState] = useState<Record<string, unknown>>(mergedValues);
    const [errors, setErrorsState] = useState<Record<string, string>>({});
    const [touched, setTouchedState] = useState<Record<string, boolean>>({});
    const [dirty, setDirtyState] = useState<Record<string, boolean>>({});
    const [verification, setVerificationState] = useState<Record<string, VerificationState>>({});
    const [loading] = useState(false);
    const [submitting] = useState(false);

    const getFormState = useCallback((): FormState => ({
        schema,
        values,
        errors,
        touched,
        dirty,
        verification,
        loading,
        submitting,
        readonly,
        mode
    }), [schema, values, errors, touched, dirty, mode, readonly, verification, loading, submitting]);

    const getValue = useCallback((path: string) => {
        return ObjectUtil.get(values, path);
    }, [values]);

    const setValue = useCallback((path: string, value: unknown) => {
        setValuesState(prev => ObjectUtil.set(prev, path, value));
        setDirtyState(prev => ObjectUtil.set(prev, path, true) as Record<string, boolean>);
    }, []);

    const getError = useCallback((path: string) => {
        return ObjectUtil.get(errors, path) as string | undefined;
    }, [errors]);

    const setError = useCallback((path: string, error: string | string[]) => {
        setErrorsState(prev => ObjectUtil.set(prev, path, error) as Record<string, string>);
    }, []);

    const clearError = useCallback((path: string) => {
        setErrorsState(prev => ObjectUtil.unset(prev, path) as Record<string, string>);
    }, []);

    const clearErrors = useCallback(() => {
        setErrorsState({});
    }, []);

    const getVerification = useCallback((path: string): VerificationState | undefined => {
        return ObjectUtil.get(verification, path) as VerificationState | undefined;
    }, [verification]);

    const setVerification = useCallback((path: string, state: VerificationState) => {
        setVerificationState(prev => ObjectUtil.set(prev as Record<string, unknown>, path, state) as Record<string, VerificationState>);
    }, []);

    const touch = useCallback((path: string) => {
        setTouchedState(prev => ObjectUtil.set(prev, path, true) as Record<string, boolean>);
    }, []);

    const reset = useCallback(() => {
        setValuesState(mergedValues);
        setErrorsState({});
        setTouchedState({});
        setDirtyState({});
        setVerificationState({});
    }, [mergedValues]);

    const validateField = useCallback((path: string) => {
        const field = SchemaEngine.findField(schema, path);

        if (!field) return true;

        const formState = getFormState();
        const isVisible = VisibilityEngine.isVisible(field, formState);
        const isReadonly = VisibilityEngine.isReadonly(field, formState);

        // Skip validation if not visible or readonly
        if (!isVisible || isReadonly) {
            clearError(path);

            return true;
        }

        const result = ValidationEngine.evaluate(field, formState);

        if (!result.valid) {
            setError(path, result.messages[0] || 'Invalid field');

            return false;
        } else {
            clearError(path);

            return true;
        }
    }, [schema, getValue, getFormState, setError, clearError]);

    const validate = useCallback(() => {
        const fields = SchemaEngine.flattenFields(schema);
        const formState = getFormState();

        let isValid = true;
        const newErrors: Record<string, string> = {};
        const newTouched: Record<string, boolean> = { ...touched };

        fields.forEach(field => {
            const path = field.name || field.code || field.id;

            const isVisible = VisibilityEngine.isVisible(field, formState);
            const isReadonly = VisibilityEngine.isReadonly(field, formState);

            if (!isVisible || isReadonly) return;

            const result = ValidationEngine.evaluate(field, formState);

            newTouched[path] = true;

            if (!result.valid) {
                newErrors[path] = result.messages[0] || 'Invalid field';
                isValid = false;
            }
        });

        setErrorsState(newErrors);
        setTouchedState(newTouched);

        return isValid;
    }, [schema, values, touched, getFormState]);

    const buildPayload = useCallback(() => {
        return PayloadBuilder.build(getFormState());
    }, [getFormState]);

    return {
        values,
        errors,
        touched,
        dirty,
        verification,
        loading,
        submitting,
        readonly,
        mode,
        schema,

        getValue,
        setValue,
        getError,
        setError,
        clearError,
        clearErrors,
        getVerification,
        setVerification,
        touch,
        reset,

        validate,
        validateField,
        buildPayload
    };
};
