import type { FormLayout } from '../enums/form-layout.enum';
import type { SectionSchema } from './section-schema.interface';

export interface FormSchema {
  id: string;
  code: string;
  title: string;
  description?: string;
  layout: FormLayout;
  sections: SectionSchema[];
  resource?: {
    get: string;
    save: string;
  };
  actions?: Array<{
    id: string;
    label: string;
    type: string;
    validateFields?: string[];
  }>;
}
