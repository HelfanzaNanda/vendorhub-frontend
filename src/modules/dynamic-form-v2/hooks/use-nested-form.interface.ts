import type { FieldSchema, FormSchema } from '../interfaces';

export interface UseNestedFormOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseNestedFormResult {
  items: Array<Record<string, any>> | Record<string, any>;
  schema: FormSchema | undefined;
  multiple: boolean;
  count: number;
  isEmpty: boolean;
  
  add: (item?: Record<string, any>) => void;
  remove: (index: number) => void;
  update: (index: number, value: Record<string, any>) => void;
  replace: (items: Array<Record<string, any>> | Record<string, any>) => void;
  move: (from: number, to: number) => void;
  clear: () => void;
}
