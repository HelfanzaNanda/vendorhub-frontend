import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';

export const WebsiteValidation: ValidationSchema = {
  required: true,
  website: true,
};
