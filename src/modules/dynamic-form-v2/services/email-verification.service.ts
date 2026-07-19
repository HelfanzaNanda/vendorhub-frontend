import { apiClient } from '@/services/api';
import { VerificationService } from '../interfaces/verification-service.interface';
import { FieldSchema, FormState, VerificationState } from '../interfaces';
import { VerificationEngine } from '../engines';
import { ObjectUtil } from '../utils';



export class EmailVerificationService implements VerificationService {

    async verify( field: FieldSchema, values: Record<string, unknown> ): Promise<VerificationState> {

        const email = values[field.name];

        if (!email) {
            return VerificationEngine.markUnverified('Email is required');
        }

        try {

            await apiClient.post('/identity/email/check', { email });

            return VerificationEngine.markVerified('Email verified successfully.');

        } catch (error: any) {

            return VerificationEngine.markUnverified(
                error?.response?.data?.message ?? 'Email verification failed.'
            );
        }
    }
}
