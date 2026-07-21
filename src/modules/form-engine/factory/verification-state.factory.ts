export class VerificationStateFactory {

    static verified(message?: string) {
        return {
            verified: true,
            loading: false,
            message
        };
    }

    static unverified(message?: string) {
        return {
            verified: false,
            loading: false,
            message
        };
    }

    static loading() {
        return {
            verified: false,
            loading: true
        };
    }

    static reset() {
        return {
            verified: false,
            loading: false
        };
    }
}
