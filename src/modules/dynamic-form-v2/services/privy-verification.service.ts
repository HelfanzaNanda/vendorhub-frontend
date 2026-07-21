import { apiClient } from '@/services/api';
import { FieldSchema, VerificationState, VerificationService } from '../interfaces';
import { ObjectUtil } from '../utils';
import { VerificationStateFactory } from '../factory/verification-state.factory';



export class PrivyVerificationService implements VerificationService {

    async verify( field: FieldSchema, values: Record<string, unknown>, verificationState: VerificationState ): Promise<VerificationState> {
        const privyId = ObjectUtil.get(values, field.name);
        const email = ObjectUtil.get(values, 'email');

        if (!privyId) {
            return VerificationStateFactory.unverified('Privy ID is required');
        }

        if (!email) {
            return VerificationStateFactory.unverified('Email is required');
        }

        try {
            await apiClient.post('/identity/privy/check', { privyId, email });

            return VerificationStateFactory.verified(
                'Privy ID verified successfully.'
            );

        } catch (error: any) {
            return VerificationStateFactory.unverified(
                error?.response?.data?.message ??
                'Privy verification failed.'
            );

        }
    }
}
