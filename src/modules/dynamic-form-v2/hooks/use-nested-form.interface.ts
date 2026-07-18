import type { FieldSchema, FormSchema } from '../interfaces';

export interface UseNestedFormOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseNestedFormResult {
  items: Array<Record<string, unknown>> | Record<string, unknown>;
  schema: FormSchema | undefined;
  multiple: boolean;
  count: number;
  isEmpty: boolean;
  
  add: (item?: Record<string, unknown>) => void;
  remove: (index: number) => void;
  update: (index: number, value: Record<string, unknown>) => void;
  replace: (items: Array<Record<string, unknown>> | Record<string, unknown>) => void;
  move: (from: number, to: number) => void;
  clear: () => void;
}
