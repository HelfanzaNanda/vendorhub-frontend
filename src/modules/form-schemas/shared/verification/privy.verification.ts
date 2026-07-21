import { VerificationAction } from '@/modules/form-engine';
import type { VerificationSchema } from '@/modules/form-engine/interfaces/verification.interface';

export const PrivyVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PRIVY,
};

export const OptionalPrivyVerification: VerificationSchema = {
  action: VerificationAction.CHECK_PRIVY,
};
