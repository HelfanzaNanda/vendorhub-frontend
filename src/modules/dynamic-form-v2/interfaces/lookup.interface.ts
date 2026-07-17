import type { HttpMethod } from '../enums/http-method.enum';

export interface LookupSchema {
  endpoint: string;
  method: HttpMethod;
  valueField: string;
  labelField: string;
  params?: Record<string, unknown>;
  searchParam?: string;
  debounce?: number;
}
