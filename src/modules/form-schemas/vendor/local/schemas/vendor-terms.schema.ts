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
  title: 'Vendor Information',
  description: 'Please provide the details of the authorized signatory representing your company.',
  layout: FormLayout.CARD,
  sections: [
    {
      id: 'signatory_details',
      code: 'SIGNATORY_DETAILS',
      title: 'Signatory Details',
      layout: FormLayout.CARD,
      fields: [
        textField({
          name: 'vendorName',
          label: 'Vendor Name',
          grid: HalfGrid,
          props: {
            disabled: true
          }
        }),
        textField({
          name: 'authorizedSignatory',
          label: 'Authorized Signatory',
          validation: { required: RequiredValidation.required },
          grid: HalfGrid
        }),
        textField({
          name: 'position',
          label: 'Position',
          validation: { required: RequiredValidation.required },
          grid: HalfGrid
        }),
        fileField({
          name: 'supportingDocumentId',
          label: 'Supporting Document',
          grid: HalfGrid,
          validation: { required: RequiredValidation.required },
          payload: {
            key: 'supportingDocumentId',
            pick: 'id'
          }
        })
      ]
    }
  ]
};
