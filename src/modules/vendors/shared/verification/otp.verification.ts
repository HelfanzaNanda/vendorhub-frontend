import { VerificationAction } from '@/modules/form-engine';
import type { VerificationSchema } from '@/modules/form-engine/interfaces/verification.interface';

export const OtpVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_OTP,
  required: true,
  otp: true,
};
