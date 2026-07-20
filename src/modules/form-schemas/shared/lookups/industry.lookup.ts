import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const IndustryLookup: LookupSchema = {
  endpoint: '/lookups/industries',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
