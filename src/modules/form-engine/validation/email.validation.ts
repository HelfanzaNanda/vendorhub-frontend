import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';
import { Regex } from '../../form-schemas/shared/constants/regex.constant';

export const EmailValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.EMAIL,
};

export const OptionalEmailValidation: ValidationSchema = {
  regexCode: Regex.EMAIL,
};
