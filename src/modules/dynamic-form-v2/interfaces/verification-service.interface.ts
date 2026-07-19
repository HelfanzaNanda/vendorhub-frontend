import type { FieldSchema, FormState, VerificationState } from '../interfaces';

export interface VerificationService {
    verify(
        field: FieldSchema,
        values: Record<string, unknown>
    ): Promise<VerificationState>;
}
