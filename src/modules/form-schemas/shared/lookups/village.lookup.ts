import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const VillageLookup: LookupSchema = {
  endpoint: '/lookups/villages',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    districtId: '${districtId}',
  },
};
