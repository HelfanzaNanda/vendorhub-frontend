import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const AreaLookup: LookupSchema = {
  endpoint: '/lookups/areas',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
