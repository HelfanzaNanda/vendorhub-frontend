import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';
import { Regex } from '../../form-schemas/shared/constants/regex.constant';

export const PercentageValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.DECIMAL,
};
