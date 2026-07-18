"use client"

import { useMemo, useCallback } from 'react';

import type { UseNestedFormOptions, UseNestedFormResult } from './use-nested-form.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine } from '../engines';

export const useNestedForm = (options: UseNestedFormOptions): UseNestedFormResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useNestedForm requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

  const path = field.name || field.code || field.id;
  const rawValue = context.getValue(path);
  
  const nestedConfig = field.nested || {};
  const isMultiple = !!nestedConfig.multiple;
  
  const schemaId = nestedConfig.schema || nestedConfig.schemaId;

  const schema = useMemo(() => {
    if (!schemaId) return undefined;
    
return SchemaEngine.resolveNestedSchema(schemaId);
  }, [schemaId]);

  // Normalize items based on multiple flag
  const items = useMemo(() => {
    if (isMultiple) {
      return (Array.isArray(rawValue) ? rawValue : []) as Array<Record<string, unknown>>;
    }

    return (rawValue && typeof rawValue === 'object' ? rawValue : {}) as Record<string, unknown>;
  }, [isMultiple, rawValue]);

  const count = isMultiple ? (items as unknown[]).length : (Object.keys(items).length > 0 ? 1 : 0);
  const isEmpty = count === 0;

  const add = useCallback((item: Record<string, unknown> = {}) => {
    if (!isMultiple) {
      context.setValue(path, item);
      
return;
    }

    const current = Array.isArray(rawValue) ? rawValue : [];

    context.setValue(path, [...current, item]);
  }, [isMultiple, context, path, rawValue]);

  const remove = useCallback((index: number) => {
    if (!isMultiple) {
      context.setValue(path, undefined);
      
return;
    }

    const current = Array.isArray(rawValue) ? rawValue : [];

    context.setValue(path, current.filter((_, i) => i !== index));
  }, [isMultiple, context, path, rawValue]);

  const update = useCallback((index: number, value: Record<string, unknown>) => {
    if (!isMultiple) {
      context.setValue(path, value);
      
return;
    }

    const current = Array.isArray(rawValue) ? rawValue : [];
    const next = [...current];

    next[index] = value;
    context.setValue(path, next);
  }, [isMultiple, context, path, rawValue]);

  const replace = useCallback((newItems: Array<Record<string, unknown>> | Record<string, unknown>) => {
    context.setValue(path, newItems);
  }, [context, path]);

  const move = useCallback((from: number, to: number) => {
    if (!isMultiple) return;
    const current = Array.isArray(rawValue) ? rawValue : [];

    if (from < 0 || from >= current.length || to < 0 || to >= current.length) return;
    
    const next = [...current];
    const [moved] = next.splice(from, 1);

    next.splice(to, 0, moved);
    
    context.setValue(path, next);
  }, [isMultiple, context, path, rawValue]);

  const clear = useCallback(() => {
    context.setValue(path, isMultiple ? [] : undefined);
  }, [context, path, isMultiple]);

  return {
    items,
    schema,
    multiple: isMultiple,
    count,
    isEmpty,
    add,
    remove,
    update,
    replace,
    move,
    clear
  };
};
