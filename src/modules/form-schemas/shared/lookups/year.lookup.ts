import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const YearLookup: LookupSchema = {
  endpoint: '/lookups/years',
  method: HttpMethod.GET,
  valueField: 'value',
  labelField: 'label',
};
