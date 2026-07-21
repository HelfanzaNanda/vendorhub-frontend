import type { ValidationSchema } from '@/modules/form-engine/interfaces/validation.interface';

export const MapsUrlValidation: ValidationSchema = {
  required: true,
  mapsUrl: true,
};
