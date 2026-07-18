import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';

export interface FieldRendererProps {
  field: FieldSchema;
  runtime?: any;
}
