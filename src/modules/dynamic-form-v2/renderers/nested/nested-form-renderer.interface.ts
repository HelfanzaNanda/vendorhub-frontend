import type { FieldSchema, FormSchema } from '@/modules/dynamic-form-v2/interfaces';

export interface NestedFormRendererProps {
  field: FieldSchema;
  schema?: FormSchema | null;
}
