import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const BankBranchLookup: LookupSchema = {
  endpoint: '/lookups/bank-branchs',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    bankId: '${bank.id}',
  }
};
