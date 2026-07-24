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
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { FullGrid, HalfGrid } from '@/modules/form-engine/grids';
import { CustomerConstants, DocumentType } from '../../common';
import { AreaLookup, YearLookup } from '@/modules/vendors/shared';



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
        autocompleteField({
            name: 'areas',
            label: 'Working Area',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            multiple: true,
            lookup: AreaLookup,
            payload: {
                key: 'areaIds',
                pick: 'id'
            }
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
            key: 'fileId',
            pick: 'id'
          }
        }),
      ]
    }
  ]
};
