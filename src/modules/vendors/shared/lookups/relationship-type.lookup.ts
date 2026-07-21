import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const RelationshipTypeLookup: LookupSchema = {
  endpoint: '/lookups/relationship-types',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
