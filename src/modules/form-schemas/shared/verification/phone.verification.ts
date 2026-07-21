import { VerificationAction } from '@/modules/form-engine';
import type { VerificationSchema } from '@/modules/form-engine/interfaces/verification.interface';

export const PhoneVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PHONE,
  required: true,
  otp: false,
};

export const PhoneVerifyVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_PHONE,
  required: true,
  otp: true,
};

export const OptionalPhoneVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PHONE,
  otp: true,
};
