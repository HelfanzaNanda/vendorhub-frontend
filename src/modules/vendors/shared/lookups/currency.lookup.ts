import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const CurrencyLookup: LookupSchema = {
  endpoint: '/lookups/currencies',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
