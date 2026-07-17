import { VerificationState } from '../../interfaces';

export class VerificationEngine {
  static markVerified(message?: string): VerificationState {
    return {
      verified: true,
      loading: false,
      message,
      verifiedAt: new Date().toISOString()
    };
  }

  static markUnverified(message?: string): VerificationState {
    return {
      verified: false,
      loading: false,
      message
    };
  }

  static markLoading(): VerificationState {
    return {
      verified: false,
      loading: true
    };
  }

  static reset(): VerificationState {
    return {
      verified: false,
      loading: false
    };
  }

  static isVerified(state?: VerificationState): boolean {
    return !!state?.verified;
  }
}
