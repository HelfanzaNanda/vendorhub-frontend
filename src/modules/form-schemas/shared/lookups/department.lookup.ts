import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';

export const DepartmentLookup: LookupSchema = {
  endpoint: '/lookups/departments',
  method: HttpMethod.GET,
  valueField: 'id',
  labelField: 'name',
};
