"use client"

import React, { useMemo } from 'react';
import { DynamicFormContext } from './dynamic-form.context';
import { useDynamicFormContext } from './use-dynamic-form-context';
import type { DynamicFormContextValue } from './dynamic-form-context.interface';

export interface NestedDynamicFormProviderProps {
    parentField: string;
    index?: number;
    children: React.ReactNode;
}

export const NestedDynamicFormProvider: React.FC<NestedDynamicFormProviderProps> = ({ parentField, index, children }) => {
    const parentContext = useDynamicFormContext();

    const prefix = index !== undefined ? `${parentField}.${index}` : parentField;

    const buildPath = (path: string) => {
        return path ? `${prefix}.${path}` : prefix;
    };

    const contextValue = useMemo<DynamicFormContextValue>(() => {
        const nestedValues = (parentContext.getValue(prefix) as Record<string, unknown>) || {};

        return {
            ...parentContext,
            values: nestedValues,
            getValue: (path: string) => parentContext.getValue(buildPath(path)),
            setValue: (path: string, value: unknown) => parentContext.setValue(buildPath(path), value),
            getError: (path: string) => parentContext.getError(buildPath(path)),
            setError: (path: string, error: string | string[]) => parentContext.setError(buildPath(path), error),
            clearError: (path: string) => parentContext.clearError(buildPath(path)),
            getVerification: (path: string) => parentContext.getVerification(buildPath(path)),
            setVerification: (path: string, state: any) => parentContext.setVerification(buildPath(path), state),
            touch: (path: string) => parentContext.touch(buildPath(path)),
            validateField: (path: string) => parentContext.validateField(buildPath(path)),
            buildPayload: () => {
                return (parentContext.getValue(prefix) as Record<string, unknown>) || {};
            }
        };
    }, [parentContext, prefix]);

    return (
        <DynamicFormContext.Provider value={contextValue}>
            {children}
        </DynamicFormContext.Provider>
    );
};
