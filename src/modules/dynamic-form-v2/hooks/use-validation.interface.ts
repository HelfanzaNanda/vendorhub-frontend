import type { FieldSchema } from '../interfaces';

export interface UseValidationOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseValidationResult {
  validate: () => boolean | Promise<boolean>;
  validateField: (path?: string) => boolean | Promise<boolean>;
  clear: () => void;
  clearField: (path?: string) => void;
  setError: (pathOrError: string, maybeError?: string) => void;
  getError: (path?: string) => string | undefined;
  hasError: boolean;
  isValid: boolean;
}
