import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const YearLookup: LookupSchema = {
  endpoint: '/lookups/years',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
