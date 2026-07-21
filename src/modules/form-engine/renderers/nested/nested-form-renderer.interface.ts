import type { FieldSchema, FormSchema } from '@/modules/form-engine/interfaces';

export interface NestedFormRendererProps {
  field: FieldSchema;
  schema?: FormSchema | null;
}
