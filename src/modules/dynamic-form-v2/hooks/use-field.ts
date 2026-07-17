import { useMemo, useCallback } from 'react';

import type { UseFieldOptions, UseFieldResult } from './use-field.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine, VisibilityEngine } from '../engines';

export const useField = (options: UseFieldOptions): UseFieldResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useField requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

  const path = field.name || field.code || field.id;
  const value = context.getValue(path);
  const error = context.getError(path);
  const touched = !!context.touched[path];
  const dirty = !!context.dirty[path];
  const loading = context.loading;
  const defaultValue = field.defaultValue;

  const formState = useMemo(() => ({
    schema: context.schema,
    values: context.values,
    errors: context.errors,
    touched: context.touched,
    dirty: context.dirty,
    mode: context.mode,
    readonly: context.readonly,
    verification: context.verification,
    loading: context.loading
  }), [context]);

  const visible = useMemo(() => VisibilityEngine.isVisible(field, formState), [field, formState]);
  const disabled = useMemo(() => context.readonly || VisibilityEngine.isReadonly(field, formState), [context.readonly, field, formState]);
  const readonly = disabled;
  const required = !!field.validation?.required;

  const setValue = useCallback((val: any) => context.setValue(path, val), [context, path]);
  const setError = useCallback((err: string) => context.setError(path, err), [context, path]);
  const clearError = useCallback(() => context.clearError(path), [context, path]);
  const touch = useCallback(() => context.touch(path), [context, path]);

  const reset = useCallback(() => {
    context.setValue(path, defaultValue);
    context.clearError(path);
  }, [context, path, defaultValue]);

  const validate = useCallback(() => context.validateField(path), [context, path]);

  return {
    field,
    value,
    defaultValue,
    error,
    touched,
    dirty,
    readonly,
    disabled,
    visible,
    loading,
    required,

    setValue,
    setError,
    clearError,
    touch,
    reset,
    validate
  };
};
