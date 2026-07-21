export const VerificationAction = {
  CHECK_EMAIL: 'CHECK_EMAIL',
  CHECK_PHONE: 'CHECK_PHONE',
  CHECK_PRIVY: 'CHECK_PRIVY',
  VERIFY_PHONE: 'VERIFY_PHONE',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
} as const;

export type VerificationAction = typeof VerificationAction[keyof typeof VerificationAction];
