import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';
import { Regex } from '../../vendors/shared/constants/regex.constant';

export const NpwpValidation: ValidationSchema = {
  required: true,
  regexCode: Regex.NPWP,
};
