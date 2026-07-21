import { apiClient } from '@/services/api';
import { FieldSchema, VerificationState, VerificationService } from '../interfaces';
import { ObjectUtil } from '../utils';
import { VerificationStateFactory } from '../factory/verification-state.factory';



export class EmailVerificationService implements VerificationService {

    async verify( field: FieldSchema, values: Record<string, unknown>, verificationState: VerificationState ): Promise<VerificationState> {

        const email = values[field.name];

        if (!email) {
            return VerificationStateFactory.unverified('Email is required');
        }

        try {

            await apiClient.post('/identity/email/check', { email });

            return VerificationStateFactory.verified('Email verified successfully.');

        } catch (error: any) {

            return VerificationStateFactory.unverified(
                error?.response?.data?.message ?? 'Email verification failed.'
            );
        }
    }
}
