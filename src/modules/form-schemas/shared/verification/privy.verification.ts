import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';
import { VerificationAction } from '../constants/verification-action.constant';

export const PrivyVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_PRIVY,
  required: true,
  otp: false,
};

export const OptionalPrivyVerification: VerificationSchema = {
  action: VerificationAction.VERIFY_PRIVY,
};
