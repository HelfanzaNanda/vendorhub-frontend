import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const CityLookup: LookupSchema = {
  endpoint: '/lookups/cities',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    provinceId: '${province.id}',
  },
};
