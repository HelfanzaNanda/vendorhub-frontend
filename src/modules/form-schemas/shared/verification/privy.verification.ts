import { VerificationAction } from '@/modules/dynamic-form-v2';
import type { VerificationSchema } from '@/modules/dynamic-form-v2/interfaces/verification.interface';

export const PrivyVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PRIVY,
};

export const OptionalPrivyVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PRIVY,
};
