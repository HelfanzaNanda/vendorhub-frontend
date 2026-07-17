import { useState, useCallback } from 'react';

import type { UseDynamicFormOptions, UseDynamicFormReturn } from './use-dynamic-form.interface';
import {
  ValidationEngine,
  SchemaEngine,
  PayloadBuilder,
  VisibilityEngine
} from '../engines';
import { ObjectUtil } from '../utils';
import type { FormState } from '../interfaces';

export const useDynamicForm = (options: UseDynamicFormOptions): UseDynamicFormReturn => {
  const { schema, initialValues = {}, mode = 'CREATE', readonly = false } = options;

  const [values, setValuesState] = useState<Record<string, any>>(initialValues);
  const [errors, setErrorsState] = useState<Record<string, string>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [dirty, setDirtyState] = useState<Record<string, boolean>>({});
  const [verification, setVerificationState] = useState<Record<string, any>>({});
  const [loading] = useState(false);

  const getFormState = useCallback((): FormState => ({
    schema,
    values,
    errors,
    touched,
    dirty,
    mode,
    readonly,
    verification,
    loading
  }), [schema, values, errors, touched, dirty, mode, readonly, verification, loading]);

  const getValue = useCallback((path: string) => {
    return ObjectUtil.get(values, path);
  }, [values]);

  const setValue = useCallback((path: string, value: any) => {
    setValuesState(prev => ObjectUtil.set(prev, path, value));
    setDirtyState(prev => ObjectUtil.set(prev, path, true));
  }, []);

  const getError = useCallback((path: string) => {
    return ObjectUtil.get(errors, path) as string | undefined;
  }, [errors]);

  const setError = useCallback((path: string, error: string) => {
    setErrorsState(prev => ObjectUtil.set(prev, path, error));
  }, []);

  const clearError = useCallback((path: string) => {
    setErrorsState(prev => ObjectUtil.unset(prev, path));
  }, []);

  const clearErrors = useCallback(() => {
    setErrorsState({});
  }, []);

  const getVerification = useCallback((path: string) => {
    return ObjectUtil.get(verification, path);
  }, [verification]);

  const setVerification = useCallback((path: string, state: any) => {
    setVerificationState(prev => ObjectUtil.set(prev, path, state));
  }, []);

  const touch = useCallback((path: string) => {
    setTouchedState(prev => ObjectUtil.set(prev, path, true));
  }, []);

  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrorsState({});
    setTouchedState({});
    setDirtyState({});
    setVerificationState({});
  }, [initialValues]);

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

    const val = getValue(path);
    const result = ValidationEngine.evaluate(field, val);

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

      const val = ObjectUtil.get(values, path);
      const result = ValidationEngine.evaluate(field, val);

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
    return PayloadBuilder.build(schema, getFormState());
  }, [schema, getFormState]);

  return {
    values,
    errors,
    touched,
    dirty,
    verification,
    loading,
    readonly,
    mode,

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
