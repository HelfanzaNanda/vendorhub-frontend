import { VerificationAction } from '@/modules/dynamic-form-v2';
import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';

export const OtpVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_OTP,
  required: true,
  otp: true,
};
