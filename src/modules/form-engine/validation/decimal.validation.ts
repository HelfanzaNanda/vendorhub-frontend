import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';
import { Regex } from '../../form-schemas/shared/constants/regex.constant';

export const DecimalValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.DECIMAL,
};
