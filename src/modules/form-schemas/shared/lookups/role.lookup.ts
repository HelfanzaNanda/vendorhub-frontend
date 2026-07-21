import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const RoleLookup: LookupSchema = {
  endpoint: '/lookups/roles',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
  params: {
    type: 'EXTERNAL'
  }
};
