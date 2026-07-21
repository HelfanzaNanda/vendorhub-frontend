import { 
  FormSchema, 
  FormLayout, 
  textField, 
  fileField
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { HalfGrid } from '@/modules/form-engine/grids';

export const VendorTermsSchema: FormSchema = {
  id: 'vendor_terms',
  code: 'VENDOR_TERMS',
  title: 'Terms & Conditions',
  description: 'Please review and accept the terms and conditions.',
  layout: FormLayout.TERMS,
  sections: []
};
