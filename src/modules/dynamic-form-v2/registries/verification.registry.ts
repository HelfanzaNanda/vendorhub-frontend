import { VerificationAction } from "../enums";
import { VerificationService } from "../interfaces";
import { EmailVerificationService, PhoneVerificationService, PrivyVerificationService } from "../services";

export class VerificationRegistry {
    private static registry = new Map<string, VerificationService>(
        [
            [
                VerificationAction.CHECK_EMAIL,
                new EmailVerificationService()
            ],
            [
                VerificationAction.CHECK_PRIVY,
                new PrivyVerificationService()
            ],
            [
                VerificationAction.CHECK_PHONE,
                new PhoneVerificationService()
            ],
            [
                VerificationAction.VERIFY_EMAIL,
                new EmailVerificationService()
            ],
            [
                VerificationAction.VERIFY_PHONE,
                new PhoneVerificationService()
            ],
        ]
    );

    static register(action: string, service: VerificationService) {
        this.registry.set(action, service);
    }

    static resolve(action: string): VerificationService | undefined {
        return this.registry.get(action);
    }

    static unregister(action: string) {
        this.registry.delete(action);
    }

    static get(action: string) {
        return this.registry.get(action);
    }

    static getAll() {
        return Array.from(this.registry.entries()).map(([key, value]) => ({
            key,
            value
        }));
    }

}
