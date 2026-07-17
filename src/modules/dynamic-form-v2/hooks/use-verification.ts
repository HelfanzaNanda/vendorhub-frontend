import { useMemo, useCallback, useEffect, useRef } from 'react';

import type { UseVerificationOptions, UseVerificationResult } from './use-verification.interface';
import { useDynamicFormContext } from '../context';
import { SchemaEngine, VerificationEngine, VisibilityEngine } from '../engines';

export const useVerification = (options: UseVerificationOptions): UseVerificationResult => {
  const context = useDynamicFormContext();
  const { field: propsField, fieldPath } = options;

  const field = useMemo(() => {
    if (propsField) return propsField;

    if (fieldPath && context.schema) {
      const found = SchemaEngine.findField(context.schema, fieldPath);

      if (found) return found;
    }

    throw new Error('useVerification requires either field or a valid fieldPath');
  }, [propsField, fieldPath, context.schema]);

  const path = field.name || field.code || field.id;
  const value = context.getValue(path);
  const state = context.getVerification(path) || VerificationEngine.reset();
  
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

  const isVisible = useMemo(() => VisibilityEngine.isVisible(field, formState), [field, formState]);

  const verificationType = field.verification?.type;

  const reset = useCallback(() => {
    context.setVerification(path, VerificationEngine.reset());
  }, [context, path]);

  // Auto-reset when value changes
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (value !== previousValueRef.current) {
      if (state.verified || state.loading || state.message) {
        reset();
      }

      previousValueRef.current = value;
    }
  }, [value, state, reset]);

  const verify = useCallback(async () => {
    if (!field.verification) return;
    if (state.loading) return;
    if (!isVisible) return; // Hidden fields are inherently verified

    context.setVerification(path, VerificationEngine.markLoading());
    
    try {
      const isSuccess = await VerificationEngine.verify(field, value);

      if (isSuccess) {
        context.setVerification(path, VerificationEngine.markVerified());
      } else {
        context.setVerification(path, VerificationEngine.markUnverified('Verification failed'));
      }
    } catch (err: any) {
      context.setVerification(path, VerificationEngine.markUnverified(err.message || 'Verification error'));
    }
  }, [field, value, isVisible, state.loading, context, path]);

  const refresh = useCallback(() => {
    verify();
  }, [verify]);

  // Derived outputs
  const verified = useMemo(() => {
    if (!isVisible) return true;
    if (!field.verification) return true;
    
return !!state.verified;
  }, [isVisible, field.verification, state.verified]);

  return {
    verified,
    loading: !!state.loading,
    error: !state.verified && !state.loading && state.message ? state.message : undefined,
    verificationType,
    verify,
    reset,
    refresh
  };
};
