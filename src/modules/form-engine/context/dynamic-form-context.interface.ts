import type { FormState, VerificationState } from '../interfaces';

/**
 * DynamicFormContextValue is the single source of truth for the entire Dynamic Form V2 runtime.
 * It contains the FormState and all methods required to mutate it.
 */
export interface DynamicFormContextValue extends FormState {
  getValue: (path: string) => unknown;
  setValue: (path: string, value: unknown) => void;
  getError: (path: string) => string | string[] | undefined;
  setError: (path: string, error: string | string[]) => void;
  clearError: (path: string) => void;
  clearErrors: () => void;
  getVerification: (path: string) => VerificationState | undefined;
  setVerification: (path: string, state: VerificationState) => void;
  touch: (path: string) => void;
  reset: () => void;
  
  isDirty: boolean;
  markClean: () => void;
  resetDirty: () => void;
  setValuesAndClean: (newValues: Record<string, unknown>) => void;

  validate: () => boolean;
  validateField: (path: string) => boolean;
  buildPayload: () => Record<string, unknown>;
}
