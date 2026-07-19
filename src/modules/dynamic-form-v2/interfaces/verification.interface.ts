import type { VerificationAction } from "../enums";

export interface VerificationSchema {
    action: VerificationAction;
    required?: boolean;
    otp?: boolean;
}
