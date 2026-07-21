import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const CityLookup: LookupSchema = {
  endpoint: '/lookups/cities',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    provinceId: '${province.id}',
  },
};
