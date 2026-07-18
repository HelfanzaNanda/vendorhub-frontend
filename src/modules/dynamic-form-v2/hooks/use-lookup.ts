"use client"

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';

import type { UseLookupOptions, UseLookupResult } from './use-lookup.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine, LookupEngine, DependencyEngine } from '../engines';

export const useLookup = (options: UseLookupOptions): UseLookupResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useLookup requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

  const [optionsState, setOptionsState] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string | undefined>();
  
  const valuesRef = useRef(context.values);
  const previousValuesRef = useRef(context.values);
  
  // Keep values fresh for reload without triggering reload on every change
  useEffect(() => {
    valuesRef.current = context.values;
  }, [context.values]);

  const reload = useCallback(async () => {
    if (!field.lookup) return;
    
    setLoading(true);
    setError(undefined);
    
    try {
      const data = await LookupEngine.load(field, valuesRef.current);
      
      const valueField = field.lookup.valueField || 'id';
      const labelField = field.lookup.labelField || 'name';
      
      const formattedOptions = data.map(item => ({
        ...item,
        value: item[valueField],
        label: item[labelField]
      }));
      
      setOptionsState(formattedOptions);
    } catch (err: any) {
      setError(err.message || 'Failed to load lookup options');
      setOptionsState([]);
    } finally {
      setLoading(false);
    }
  }, [field]);

  const clear = useCallback(() => {
    setOptionsState([]);
    setError(undefined);
  }, []);

  // Auto load initially
  useEffect(() => {
    if (field.lookup) {
      reload();
    } else {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.lookup, clear]); // Deliberately omit reload so it only runs on mount or field change

  // Dependency Engine evaluation
  useEffect(() => {
    if (!context.schema || !field.lookup) {
      previousValuesRef.current = context.values;
      
return;
    }
    
    const changedFields: string[] = [];

    for (const key in context.values) {
      if (context.values[key] !== previousValuesRef.current[key]) {
        changedFields.push(key);
      }
    }
    
    let shouldReload = false;

    for (const changed of changedFields) {
      const affected = DependencyEngine.getDependentFields(context.schema, changed);

      if (affected.some(f => f.name === field.name || f.code === field.code || f.id === field.id)) {
        shouldReload = true;
        break;
      }
    }
    
    previousValuesRef.current = context.values;
    
    if (shouldReload) {
      reload();
    }
  }, [context.values, context.schema, field, reload]);

  return {
    options: optionsState,
    loading,
    error,
    reload,
    clear
  };
};
