import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';
import { VerificationAction } from '../constants/verification-action.constant';

export const OtpVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_OTP,
  required: true,
  otp: true,
};
