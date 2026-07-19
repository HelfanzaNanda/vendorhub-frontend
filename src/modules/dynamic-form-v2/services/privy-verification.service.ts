import { apiClient } from '@/services/api';
import { VerificationService } from '../interfaces/verification-service.interface';
import { FieldSchema, FormState, VerificationState } from '../interfaces';
import { VerificationEngine } from '../engines';
import { ObjectUtil } from '../utils';



export class PrivyVerificationService implements VerificationService {

    async verify( field: FieldSchema, values: Record<string, unknown>, verificationState: VerificationState ): Promise<VerificationState> {
        const privyId = ObjectUtil.get(values, field.name);
        const email = ObjectUtil.get(values, 'email');

        if (!privyId) {
            return VerificationEngine.markUnverified('Privy ID is required');
        }

        if (!email) {
            return VerificationEngine.markUnverified('Email is required');
        }

        try {
            await apiClient.post('/identity/privy/check', { privyId, email });

            return VerificationEngine.markVerified(
                'Privy ID verified successfully.'
            );

        } catch (error: any) {
            return VerificationEngine.markUnverified(
                error?.response?.data?.message ??
                'Privy verification failed.'
            );

        }
    }
}
