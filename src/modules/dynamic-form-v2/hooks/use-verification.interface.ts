import type { FieldSchema } from '../interfaces';

export interface UseVerificationOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseVerificationResult {
  verified: boolean;
  loading: boolean;
  error: string | undefined;
  verificationType: string | undefined;
  verify: () => Promise<void>;
  reset: () => void;
  refresh: () => void;
}
