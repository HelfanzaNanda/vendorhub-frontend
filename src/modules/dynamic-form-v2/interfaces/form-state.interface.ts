import type { VerificationState } from './verification-state.interface';

export interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, string | string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  loading: boolean;
  submitting: boolean;
  verification: Record<string, VerificationState>;
}
