import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const KbliLookup: LookupSchema = {
  endpoint: '/lookups/industry-classifications',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'number',
};
