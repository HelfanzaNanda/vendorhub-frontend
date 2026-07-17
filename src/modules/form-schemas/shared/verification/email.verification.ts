import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';
import { VerificationAction } from '../constants/verification-action.constant';

export const EmailVerification: VerificationSchema = {
  action: VerificationAction.CHECK_EMAIL,
  required: true,
  otp: true,
};

export const OptionalEmailVerification: VerificationSchema = {
  action: VerificationAction.CHECK_EMAIL,
  otp: true,
};
