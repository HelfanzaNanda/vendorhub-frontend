import { 
  FormSchema, 
  FormLayout, 
  textField, 
  fileField
} from '@/modules/dynamic-form-v2';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { HalfGrid } from '@/modules/dynamic-form-v2/grids';

export const VendorTermsSchema: FormSchema = {
  id: 'vendor_terms',
  code: 'VENDOR_TERMS',
  title: 'Terms & Conditions',
  description: 'Please review and accept the terms and conditions.',
  layout: FormLayout.TERMS,
  sections: []
};
