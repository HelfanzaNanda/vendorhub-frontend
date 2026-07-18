"use client"

import { useMemo, useCallback } from 'react';

import type { UseValidationOptions, UseValidationResult } from './use-validation.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine } from '../engines';

export const useValidation = (options?: UseValidationOptions): UseValidationResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options || {};

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    
return undefined;
  }, [propsField, fieldPath, context.schema]);

  const defaultPath = field?.name || field?.code || field?.id || fieldPath;

  const validateField = useCallback((path?: string) => {
    const targetPath = path || defaultPath;

    if (!targetPath) throw new Error('useValidation: path is required for validateField when not bound to a field');
    
return context.validateField(targetPath);
  }, [context, defaultPath]);

  const validate = useCallback(() => {
    return context.validate();
  }, [context]);

  const clearField = useCallback((path?: string) => {
    const targetPath = path || defaultPath;

    if (!targetPath) throw new Error('useValidation: path is required for clearField when not bound to a field');
    context.clearError(targetPath);
  }, [context, defaultPath]);

  const clear = useCallback(() => {
    context.clearErrors();
  }, [context]);

  const setError = useCallback((pathOrError: string, maybeError?: string) => {
    if (maybeError !== undefined) {
      context.setError(pathOrError, maybeError);
    } else {
      if (!defaultPath) throw new Error('useValidation: path is required for setError when not bound to a field');
      context.setError(defaultPath, pathOrError);
    }
  }, [context, defaultPath]);

  const getError = useCallback((path?: string) => {
    const targetPath = path || defaultPath;

    if (!targetPath) return undefined;
    
return context.getError(targetPath);
  }, [context, defaultPath]);

  const hasError = useMemo(() => {
    if (defaultPath) {
      return !!context.getError(defaultPath);
    }

    
return Object.keys(context.errors).length > 0;
  }, [context, defaultPath]);

  const isValid = !hasError;

  return {
    validate,
    validateField,
    clear,
    clearField,
    setError,
    getError,
    hasError,
    isValid
  };
};
