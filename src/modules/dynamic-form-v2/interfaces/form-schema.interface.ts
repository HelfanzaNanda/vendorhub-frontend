import type { FormLayout } from '../enums/form-layout.enum';
import type { SectionSchema } from './section-schema.interface';

export interface FormSchema {
  id: string;
  code: string;
  title: string;
  description?: string;
  layout: FormLayout;
  sections: SectionSchema[];
}
