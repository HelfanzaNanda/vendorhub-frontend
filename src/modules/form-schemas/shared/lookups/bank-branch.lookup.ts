import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const BankBranchLookup: LookupSchema = {
  endpoint: '/lookups/bank-branches',
  method: HttpMethod.GET,
  valueField: 'value',
  labelField: 'label',
};
