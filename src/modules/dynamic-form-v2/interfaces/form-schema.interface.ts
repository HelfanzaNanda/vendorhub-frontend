import { FormLayout } from '../enums/form-layout.enum';
import { SectionSchema } from './section-schema.interface';

export interface FormSchema {
  id: string;
  code: string;
  title: string;
  description?: string;
  layout: FormLayout;
  sections: SectionSchema[];
}
