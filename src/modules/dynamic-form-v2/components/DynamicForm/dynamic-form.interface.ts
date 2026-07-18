import React from 'react';
import type { FormSchema } from '@/modules/dynamic-form-v2';

export interface DynamicFormProps {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  defaultValues?: Record<string, unknown>; // For backward compatibility
  mode?: 'CREATE' | 'EDIT' | 'VIEW';
  readonly?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
