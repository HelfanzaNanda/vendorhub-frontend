import { fa } from 'zod/v4/locales';
import type { VerificationState, FieldSchema, FormState } from '../../interfaces';
import { VerificationRegistry } from '../../registries';

/**
 * VerificationEngine
 * 
 * Manages OTP/verification workflows for specific fields.
 * Validates verification status and simulates API interactions.
 */
export class VerificationEngine {
    static markVerified(message?: string): VerificationState {
        return {
            verified: true,
            loading: false,
            message,
            verifiedAt: new Date().toISOString()
        };
    }

    static markUnverified(message?: string): VerificationState {
        return {
            verified: false,
            loading: false,
            message
        };
    }

    static markLoading(): VerificationState {
        return {
            verified: false,
            loading: true
        };
    }

    static reset(): VerificationState {
        return {
            verified: false,
            loading: false
        };
    }

    static isVerified(state?: VerificationState): boolean {
        return !!state?.verified;
    }

    static async verify(field: FieldSchema, values: Record<string, unknown>): Promise<VerificationState> {
        if (!field.verification) {
            return this.markVerified();
        };

        

        const service = VerificationRegistry.get(field.verification.action);

        if (!service) {
            throw new Error(
                `Verification service "${field.verification.action}" is not registered.`
            );
        }

        console.log('CJENJCCJE');


        return service.verify(field, values);
    }
}
