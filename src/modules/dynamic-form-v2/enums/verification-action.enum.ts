export const VerificationAction = {
  CHECK_EMAIL: 'CHECK_EMAIL',
  CHECK_PHONE: 'CHECK_PHONE',
  CHECK_PRIVY: 'CHECK_PRIVY',
  SEND_OTP: 'SEND_OTP',
  VERIFY_OTP: 'VERIFY_OTP',
} as const;

export type VerificationAction = typeof VerificationAction[keyof typeof VerificationAction];
