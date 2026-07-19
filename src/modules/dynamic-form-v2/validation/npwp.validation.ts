import type { ValidationSchema } from '@/modules/dynamic-form-v2/interfaces/validation.interface';
import { Regex } from '../../form-schemas/shared/constants/regex.constant';

export const NpwpValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.NPWP,
};
