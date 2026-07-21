import { 
  FormSchema, 
  FormLayout, 
  textField, 
  currencyField, 
  dateField, 
  textareaField, 
  fileField, 
  numberField,
  autocompleteField
} from '@/modules/dynamic-form-v2';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { FullGrid, HalfGrid } from '@/modules/dynamic-form-v2/grids';
import { CustomerConstants, DocumentType } from '../../common';
import { YearLookup } from '@/modules/form-schemas/shared';

export const CustomerReferenceSchema: FormSchema = {
  id: CustomerConstants.SCHEMA_ID,
  title: CustomerConstants.SCHEMA_TITLE,
  code: CustomerConstants.SECTION_CODE,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: CustomerConstants.SECTION_ID,
      code: CustomerConstants.SECTION_CODE,
      title: CustomerConstants.SECTION_TITLE,
      description: CustomerConstants.SECTION_DESCRIPTION,
      layout: FormLayout.DEFAULT,
      fields: [
        textField({
            name: 'name',
            label: 'Project Name',
            validation: { required: RequiredValidation.required }, 
            grid: FullGrid 
        }),
        autocompleteField({
            name: 'year',
            label: 'Year',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: YearLookup,
            payload: {
                key: 'year',
                pick: 'id'
            }
        }),
        currencyField({
            name: 'projectValue',
            label: 'Project Value',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        textareaField({
            name: 'description',
            label: 'Project Description',
            validation: { required: RequiredValidation.required }, 
            grid: FullGrid
        }),
        
        
        fileField({ 
          name: 'file', 
          label: 'Attachment', 
          validation: { required: RequiredValidation.required }, 
          grid: FullGrid, 
          file: {
            documentTypeCode: DocumentType.CUSTOMER_REFERENCE
          }, 
          payload: {
            key: 'fileid',
            pick: 'id'
          }
        }),
      ]
    }
  ]
};
