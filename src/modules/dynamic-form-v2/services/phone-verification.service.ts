import { apiClient } from '@/services/api';
import { VerificationService } from '../interfaces/verification-service.interface';
import { FieldSchema, VerificationState } from '../interfaces';
import { VerificationAction } from '../enums';

export class PhoneVerificationService implements VerificationService {

    async verify(field: FieldSchema, values: Record<string, unknown>, verificationState: VerificationState): Promise<VerificationState> {
        const phone = values[field.name];

        if (!phone) {
            return { verified: false, loading: false, message: 'Phone is required' };
        }

        try {
            await this.checkPhone(phone as string);

            switch (field.verification?.action) {
                case VerificationAction.CHECK_PHONE:
                    return { 
                        verified: true, 
                        loading: false, 
                        message: 'Phone number is valid.', 
                        verifiedAt: new Date().toISOString() 
                    };

                case VerificationAction.VERIFY_PHONE:
                    if (!verificationState?.otpRequested) {
                        await this.sendOtp(phone as string);
                        return {
                            ...verificationState,
                            verified: false,
                            loading: false,
                            otpRequested: true,
                            message: undefined
                        };
                    }

                    if (!verificationState?.otpCode) {
                        return { 
                            ...verificationState, 
                            verified: false, 
                            loading: false, 
                            message: 'OTP is required.' 
                        };
                    }

                    await this.verifyOtp(phone as string, verificationState.otpCode);
                    return { 
                        ...verificationState, 
                        verified: true, 
                        loading: false, 
                        message: 'Phone verified.', 
                        verifiedAt: new Date().toISOString() 
                    };

                default:
                    return { 
                        verified: false, 
                        loading: false, 
                        message: 'Unsupported verification action.' 
                    };
            }
        } catch (error: any) {
            return {
                ...verificationState,
                verified: false,
                loading: false,
                message: error?.response?.data?.message ?? error?.message ?? 'Phone verification failed.'
            };
        }
    }

    private async checkPhone(phone: string): Promise<void> {
        await apiClient.post('/identity/phone/check', { phone });
    }

    private async sendOtp(phone: string): Promise<void> {
        await apiClient.post('/otp/send', { destination: phone });
    }

    private async verifyOtp(phone: string, otp: string): Promise<void> {
        await apiClient.post('/otp/verify', { destination: phone, otpCode: otp });
    }
}
