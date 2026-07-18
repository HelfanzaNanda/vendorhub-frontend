import type { FormSchema } from './form-schema.interface';
import type { VerificationState } from './verification-state.interface';

/**
 * Single source of truth for the entire Dynamic Form Engine.
 * All runtime state (values, errors, modes, etc.) is unified and managed 
 * through this single interface. Engines, Hooks, Context, and Renderers 
 * all read from and interact with this centralized state.
 */
export interface FormState {
    schema: FormSchema;
    values: Record<string, unknown>;
    errors: Record<string, string | string[]>;
    touched: Record<string, boolean>;
    dirty: Record<string, boolean>;
    loading: boolean;
    submitting: boolean;
    verification: Record<string, VerificationState>;
    readonly: boolean;
    mode: 'CREATE' | 'EDIT' | 'VIEW';
}
