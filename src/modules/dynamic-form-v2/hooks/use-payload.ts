import { useMemo, useCallback } from 'react';

import type { UsePayloadOptions, UsePayloadResult } from './use-payload.interface';
import { useDynamicFormContext } from '../context';
import { PayloadBuilder } from '../engines';

export const usePayload = (options?: UsePayloadOptions): UsePayloadResult => {
  const context = useDynamicFormContext();
  const schema = options?.schema || context.schema;

  if (!schema) {
    throw new Error('usePayload requires a valid schema provided via options or context.');
  }

  const formState = useMemo(() => ({
    schema,
    values: context.values,
    errors: context.errors,
    touched: context.touched,
    dirty: context.dirty,
    mode: context.mode,
    readonly: context.readonly,
    verification: context.verification,
    loading: context.loading
  }), [schema, context]);

  const build = useCallback(() => {
    return PayloadBuilder.build(schema, formState);
  }, [schema, formState]);

  const buildDraft = useCallback(() => {
    return PayloadBuilder.buildDraft(schema, formState);
  }, [schema, formState]);

  const buildSubmit = useCallback(() => {
    return PayloadBuilder.buildSubmit(schema, formState);
  }, [schema, formState]);

  const buildSection = useCallback((sectionId: string) => {
    return PayloadBuilder.buildSection(schema, formState, sectionId);
  }, [schema, formState]);

  const buildField = useCallback((fieldPath: string) => {
    return PayloadBuilder.buildField(schema, formState, fieldPath);
  }, [schema, formState]);

  return {
    build,
    buildDraft,
    buildSubmit,
    buildSection,
    buildField
  };
};
