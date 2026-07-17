import type { FieldSchema } from '../interfaces';

export interface UseLookupOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseLookupResult {
  options: Array<{ value: any; label: string; [key: string]: any }>;
  loading: boolean;
  error: Error | string | undefined;
  reload: () => Promise<void>;
  clear: () => void;
}
