export interface VerificationState {
    verified: boolean;
    loading: boolean;
    message?: string;
    verifiedAt?: string;
    otpRequested?: boolean;
    otpCode?: string;
}
