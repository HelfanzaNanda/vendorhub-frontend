import type { FieldSchema } from '../interfaces';

export interface UseVisibilityOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseVisibilityResult {
  visible: boolean;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}
