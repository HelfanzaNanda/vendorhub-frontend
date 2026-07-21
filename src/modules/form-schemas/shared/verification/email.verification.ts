import { VerificationAction } from '@/modules/form-engine';
import type { VerificationSchema } from '@/modules/form-engine/interfaces/verification.interface';

export const EmailVerification: VerificationSchema = {
  action: VerificationAction.CHECK_EMAIL,
  required: true,
  otp: true,
};

export const OptionalEmailVerification: VerificationSchema = {
  action: VerificationAction.CHECK_EMAIL,
  otp: true,
};
