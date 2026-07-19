import { apiClient } from '@/services/api';
import { VerificationService } from '../interfaces/verification-service.interface';
import { FieldSchema, FormState, VerificationState } from '../interfaces';
import { VerificationEngine } from '../engines';
import { ObjectUtil } from '../utils';



export class PhoneVerificationService implements VerificationService {

    async verify( field: FieldSchema, values: Record<string, unknown> ): Promise<VerificationState> {

        const phone = values[field.name];

        console.log('cek phone', phone);
        

        if (!phone) {
            return VerificationEngine.markUnverified('Phone is required');
        }

        try {

            await apiClient.post('/identity/phone/check', { phone });

            return VerificationEngine.markVerified('Phone verification successful.');

        } catch (error: any) {

            return VerificationEngine.markUnverified(
                error?.response?.data?.message ?? 'Phone verification failed.'
            );
        }
    }
}
