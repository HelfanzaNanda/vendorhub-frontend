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
import { DocumentType, CustomerConstants } from '../constants';
import { FullGrid, HalfGrid, RequiredValidation, YearLookup } from '@/modules/form-schemas/shared';

export const CustomerReferenceSchema: FormSchema = {
  id: CustomerConstants.SCHEMA_ID,
  title: CustomerConstants.SCHEMA_TITLE,
  code: CustomerConstants.SECTION_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: CustomerConstants.SECTION_ID,
      code: CustomerConstants.SECTION_CODE,
      title: CustomerConstants.SECTION_TITLE,
      description: CustomerConstants.SECTION_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        textField({
            name: 'name',
            label: 'Project Name',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid 
        }),
        numberField({
            name: 'rprojectValue',
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
        
        autocompleteField({
            name: 'year',
            label: 'Year',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: YearLookup
        }),
        fileField({ 
          name: 'attachment', 
          label: 'Attachment', 
          validation: { required: RequiredValidation.required }, 
          grid: HalfGrid, 
          props: { documentType: DocumentType.CUSTOMER_REFERENCE } 
        }),
      ]
    }
  ]
};
