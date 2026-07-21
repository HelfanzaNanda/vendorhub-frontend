import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';
import { Regex } from '../../vendors/shared/constants/regex.constant';

export const UrlValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.URL,
};
