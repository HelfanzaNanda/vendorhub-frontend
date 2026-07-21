import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const ProvinceLookup: LookupSchema = {
  endpoint: '/lookups/provinces',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    countryId: '${country.id}',
  },
};
