import type { FormSchema } from '../interfaces';

export interface UseDynamicFormOptions {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  mode?: 'CREATE' | 'EDIT' | 'VIEW';
  readonly?: boolean;
}
