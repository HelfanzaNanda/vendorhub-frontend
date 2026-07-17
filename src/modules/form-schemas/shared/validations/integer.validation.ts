import type { ValidationSchema } from '@/modules/dynamic-form-v2/interfaces/validation.interface';
import { Regex } from '../constants/regex.constant';

export const IntegerValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.INTEGER,
};
