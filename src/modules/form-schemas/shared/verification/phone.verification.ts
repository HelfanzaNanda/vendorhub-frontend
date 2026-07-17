import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';
import { VerificationAction } from '../constants/verification-action.constant';

export const PhoneVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PHONE,
  required: true,
  otp: true,
};

export const OptionalPhoneVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PHONE,
  otp: true,
};
