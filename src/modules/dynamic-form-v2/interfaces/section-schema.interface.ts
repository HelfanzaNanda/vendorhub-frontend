import { FormLayout } from '../enums/form-layout.enum';
import { FieldSchema } from './field-schema.interface';

export interface SectionSchema {
  id: string;
  code: string;
  title: string;
  description?: string;
  layout: FormLayout;
  fields: FieldSchema[];
}
