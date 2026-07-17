import type { FieldSchema } from '../interfaces';

export interface UseFieldOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseFieldResult {
  field: FieldSchema;
  value: any;
  defaultValue: any;
  error: string | undefined;
  touched: boolean;
  dirty: boolean;
  readonly: boolean;
  disabled: boolean;
  visible: boolean;
  loading: boolean;
  required: boolean;

  setValue: (value: any) => void;
  setError: (error: string) => void;
  clearError: () => void;
  touch: () => void;
  reset: () => void;
  validate: () => boolean | Promise<boolean>;
}
