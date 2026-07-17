import { useMemo } from 'react';

import type { UseVisibilityOptions, UseVisibilityResult } from './use-visibility.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine, VisibilityEngine } from '../engines';

export const useVisibility = (options: UseVisibilityOptions): UseVisibilityResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useVisibility requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

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
  const disabled = useMemo(() => context.readonly || VisibilityEngine.isDisabled(field, formState), [context.readonly, field, formState]);
  const readonly = useMemo(() => context.readonly || VisibilityEngine.isReadonly(field, formState), [context.readonly, field, formState]);
  const required = !!field.validation?.required; // Schema static, or theoretically dynamic via another engine in the future

  return {
    visible,
    readonly,
    disabled,
    required
  };
};
