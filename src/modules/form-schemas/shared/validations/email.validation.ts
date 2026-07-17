import type { ValidationSchema } from '@/modules/dynamic-form-v2/interfaces/validation.interface';
import { Regex } from '../constants/regex.constant';

export const EmailValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.EMAIL,
};

export const OptionalEmailValidation: ValidationSchema = {
  regexCode: Regex.EMAIL,
};
