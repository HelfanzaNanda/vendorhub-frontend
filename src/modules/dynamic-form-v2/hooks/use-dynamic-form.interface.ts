import type { FormSchema } from '../interfaces';

export interface UseDynamicFormOptions {
  schema: FormSchema;
  initialValues?: Record<string, any>;
  mode?: 'CREATE' | 'EDIT' | 'VIEW';
  readonly?: boolean;
}

export interface UseDynamicFormReturn {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  verification: Record<string, any>;
  loading: boolean;
  readonly: boolean;
  mode: 'CREATE' | 'EDIT' | 'VIEW';

  getValue: (path: string) => any;
  setValue: (path: string, value: any) => void;
  getError: (path: string) => string | undefined;
  setError: (path: string, error: string) => void;
  clearError: (path: string) => void;
  clearErrors: () => void;
  getVerification: (path: string) => any;
  setVerification: (path: string, state: any) => void;
  touch: (path: string) => void;
  reset: () => void;

  validate: () => boolean;
  validateField: (path: string) => boolean;
  buildPayload: () => Record<string, unknown>;
}
