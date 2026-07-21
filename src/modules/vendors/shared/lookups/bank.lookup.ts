import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const BankLookup: LookupSchema = {
  endpoint: '/lookups/banks',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    countryId: '${country.id}',
  }
};
