import { FormSchema } from '@/modules/dynamic-form-v2/interfaces';
import { SchemaCategory } from './schema-category';

export interface PlaygroundSchema {
  id: string;
  title: string;
  category: SchemaCategory;
  description: string;
  schema: FormSchema;
}
