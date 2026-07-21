import type { FormSchema } from '@/modules/form-engine/interfaces';
import type { SchemaCategory } from './schema-category';

export interface PlaygroundSchema {
  id: string;
  title: string;
  category: SchemaCategory;
  description: string;
  schema: FormSchema;
}
