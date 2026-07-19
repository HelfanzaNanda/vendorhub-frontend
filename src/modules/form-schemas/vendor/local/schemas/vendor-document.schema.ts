import { 
  FormSchema, 
  FormLayout, 
  fileField,
  textareaField,
  textField,
  switchField,
  dateField,
  numberField
} from '@/modules/dynamic-form-v2';
import { FullGrid, HalfGrid, QuarterGrid } from '@/modules/dynamic-form-v2/grids';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';

import { DocumentConstants, DocumentType } from '@/modules/form-schemas/vendor/common';

export const VendorDocumentSchema: FormSchema = {
  id: DocumentConstants.SCHEMA_ID,
  title: DocumentConstants.SCHEMA_TITLE,
  code: DocumentConstants.SCHEMA_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
        id: DocumentConstants.SECTION_DOCUMENT_NPWP_ID,
        code: DocumentConstants.SECTION_DOCUMENT_NPWP_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_NPWP_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_NPWP_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            textField({
                name: 'number',
                label: 'NPWP',
                grid: HalfGrid,
                validation: { required: RequiredValidation.required }
            }),
            textareaField({
                name: 'address',
                label: 'Address',
                grid: FullGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'file',
                label: 'Attachment',
                grid: FullGrid,
                validation: { required: RequiredValidation.required }
            }),
        ]
    },
    {
        id: DocumentConstants.SECTION_DOCUMENT_TAXPAYER_ID,
        code: DocumentConstants.SECTION_DOCUMENT_TAXPAYER_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_TAXPAYER_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_NPWP_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            switchField({
                name: 'taxpayerStatus',
                label: 'Taxpayer Status',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required },
                options: [
                    { label: 'PKP', value: 'PKP' },
                    { label: 'NON PKP', value: 'NON_PKP' }
                ]
            }),
            dateField({
                name: 'publishedDate',
                label: 'Date',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'file',
                label: 'Attachment',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
        ]
    },
    {
        id: DocumentConstants.SECTION_DOCUMENT_DEED_OF_ESTABLISHMENT_ID,
        code: DocumentConstants.SECTION_DOCUMENT_DEED_OF_ESTABLISHMENT_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_DEED_OF_ESTABLISHMENT_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_DEED_OF_ESTABLISHMENT_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            numberField({
                name: 'number',
                label: 'No',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required },
            }),
            dateField({
                name: 'publishedDate',
                label: 'Date',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'file',
                label: 'Attachment',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
        ]
    },
    {
        id: DocumentConstants.SECTION_DOCUMENT_DEED_OF_AMENDMENT_ID,
        code: DocumentConstants.SECTION_DOCUMENT_DEED_OF_AMENDMENT_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_DEED_OF_AMENDMENT_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_DEED_OF_AMENDMENT_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            numberField({
                name: 'number',
                label: 'No',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required },
            }),
            dateField({
                name: 'publishedDate',
                label: 'Date',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'file',
                label: 'Attachment',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
        ]
    },
    {
        id: DocumentConstants.SECTION_DOCUMENT_ORGANIZATION_STRUCTURE_ID,
        code: DocumentConstants.SECTION_DOCUMENT_ORGANIZATION_STRUCTURE_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_ORGANIZATION_STRUCTURE_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_ORGANIZATION_STRUCTURE_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            fileField({
                name: 'file',
                label: 'Attachment',
                grid: QuarterGrid,
                validation: { required: RequiredValidation.required }
            }),
        ]
    },
    
  ]
};
