import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const BusinessCategoryLookup: LookupSchema = {
  endpoint: '/lookups/business-categories',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
