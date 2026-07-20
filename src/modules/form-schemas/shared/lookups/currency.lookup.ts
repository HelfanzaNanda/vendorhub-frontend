import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const CurrencyLookup: LookupSchema = {
  endpoint: '/lookups/currencies',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
