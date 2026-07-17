import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const DistrictLookup: LookupSchema = {
  endpoint: '/lookups/districts',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    cityId: '${cityId}',
  },
};
