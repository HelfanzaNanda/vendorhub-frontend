import type { FieldSchema, FormState } from '../../interfaces';
import { ObjectUtil } from '../../utils';

export interface ValidationResult {
    valid: boolean;
    messages: string[];
}

/**
 * ValidationEngine
 * 
 * Evaluates field validation rules against the current FormState.
 * Returns valid status and messages without side effects.
 */
export class ValidationEngine {
    static evaluate(field: FieldSchema, formState: FormState): ValidationResult {
        const messages: string[] = [];
        const path = field.name || field.code || field.id;
        const value = ObjectUtil.get(formState.values, path);
        const validation = field.validation;

        if (!validation) {
            return { valid: true, messages };
        }

        const isEmpty = value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

        if (validation.required && isEmpty) {
            messages.push(validation.message || `${field.label || field.name} cannot be empty`);

            return { valid: false, messages };
        }

        if (isEmpty) {
            return { valid: true, messages };
        }

        const strValue = String(value);
        const numValue = Number(value);

        if (validation.minLength !== undefined && strValue.length < validation.minLength) {
            messages.push(validation.message || `Minimum length is ${validation.minLength}`);
        }

        if (validation.maxLength !== undefined && strValue.length > validation.maxLength) {
            messages.push(validation.message || `Maximum length is ${validation.maxLength}`);
        }

        if (validation.min !== undefined && numValue < validation.min) {
            messages.push(validation.message || `Minimum value is ${validation.min}`);
        }

        if (validation.max !== undefined && numValue > validation.max) {
            messages.push(validation.message || `Maximum value is ${validation.max}`);
        }

        if (validation.regexCode) {
            // In a real application, regex patterns would be retrieved from a constant or configuration
            const regexPatterns: Record<string, RegExp> = {
                EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                PHONE: /^\+?[0-9]{10,15}$/,
                PASSWORD: /^.{8,}$/,
                NPWP: /^[0-9]{15}$/,
                NIK: /^[0-9]{16}$/
            };

            const pattern = regexPatterns[validation.regexCode];

            if (pattern && !pattern.test(strValue)) {
                messages.push(validation.message || `Invalid format for ${validation.regexCode}`);
            }
        }

        if (validation.email && !ValidationEngine.isValidEmail(strValue)) {
            messages.push(validation.message || 'Please enter a valid email address');
        }

        if (validation.website && !ValidationEngine.isValidUrl(strValue)) {
            messages.push(validation.message || 'Please enter a valid website URL');
        }

        if (validation.phone && !ValidationEngine.isValidPhone(strValue)) {
            messages.push(validation.message || 'Please enter a valid phone number');
        }

        if (validation.mapsUrl && !ValidationEngine.isValidMapsUrl(strValue)) {
            messages.push(validation.message || 'Please enter a valid maps URL');
        }

        return {
            valid: messages.length === 0,
            messages
        };
    }

    private static isValidUrl(value: string): boolean {
        try {
            new URL(value);

            return true;
        } catch {
            return false;
        }
    }

    private static isValidEmail(value: string): boolean {
        const EMAIL_REGEX =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return EMAIL_REGEX.test(value.trim());
    }

    private static isValidPhone(value: string): boolean {
        const PHONE_REGEX =
            /^(\+62|62|0)[0-9]{8,15}$/;

        return PHONE_REGEX.test(value.replace(/\s|-/g, ''));
    }

    private static isValidMapsUrl(value: string): boolean {
        try {
            const url = new URL(value);

            return [
                'maps.google.com',
                'www.google.com',
                'goo.gl',
                'maps.app.goo.gl'
            ].includes(url.hostname);
        } catch {
            return false;
        }
    }
}
