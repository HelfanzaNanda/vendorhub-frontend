import type { ValidationSchema } from '@/modules/dynamic-form-v2/interfaces/validation.interface';

export const WebsiteValidation: ValidationSchema = {
  required: true,
  website: true,
};
