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

    const isEmpty = value === null || value === undefined || value === '';
    
    if (validation.required && isEmpty) {
      messages.push(validation.message || `${field.label || field.name} is required`);
      
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

    return {
      valid: messages.length === 0,
      messages
    };
  }
}
