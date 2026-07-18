import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const BusinessCategoryLookup: LookupSchema = {
  endpoint: '/lookups/business-categories',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
