import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';

export const RelationshipTypeLookup: LookupSchema = {
  endpoint: '/lookups/relationship-types',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
