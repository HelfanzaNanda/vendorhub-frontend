import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const PositionLookup: LookupSchema = {
  endpoint: '/lookups/positions',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
