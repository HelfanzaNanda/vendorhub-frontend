import { useMemo, useCallback, useEffect, useRef } from 'react';

import type { UseDependencyOptions, UseDependencyResult } from './use-dependency.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine, DependencyEngine } from '../engines';

export const useDependency = (options: UseDependencyOptions): UseDependencyResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useDependency requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

  const dependency = field.dependency;
  const hasDependency = !!dependency;
  const parentPath = dependency?.parent;

  const parentValue = useMemo(() => {
    if (!parentPath) return undefined;
    
return context.getValue(parentPath);
  }, [parentPath, context]);

  const path = field.name || field.code || field.id;
  const previousParentValueRef = useRef(parentValue);

  const refresh = useCallback(() => {
    if (!hasDependency || !parentPath || !context.schema) return;

    const { nextValues } = DependencyEngine.processDependencyChange(
      context.schema, 
      parentPath, 
      context.values
    );

    const nextFieldValue = nextValues[field.name];
    const currentFieldValue = context.values[field.name];

    if (nextFieldValue !== currentFieldValue) {
      context.setValue(path, nextFieldValue);
    }
  }, [hasDependency, parentPath, context, path, field.name]);

  useEffect(() => {
    if (parentValue !== previousParentValueRef.current) {
      refresh();
      previousParentValueRef.current = parentValue;
    }
  }, [parentValue, refresh]);

  return {
    parentValue,
    hasDependency,
    dependency,
    refresh
  };
};
