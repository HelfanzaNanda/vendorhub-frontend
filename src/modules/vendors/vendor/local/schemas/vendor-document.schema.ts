import { 
  FormSchema, 
  FormLayout, 
  fileField,
  textareaField,
  textField,
  switchField,
  dateField,
  numberField
} from '@/modules/form-engine';
import { FullGrid, HalfGrid, QuarterGrid, ThirdGrid, TwoThirdsGrid } from '@/modules/form-engine/grids';
import { RequiredValidation } from '@/modules/form-engine/validation';

import { DocumentConstants, DocumentType } from '@/modules/vendors/vendor/common';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export const VendorDocumentSchema: FormSchema = {
  id: DocumentConstants.SCHEMA_ID,
  title: DocumentConstants.SCHEMA_TITLE,
  code: DocumentConstants.SCHEMA_CODE,
  layout: FormLayout.DEFAULT,
  resource: {
    get: '/vendor-document-temps',
    save: '/vendor-document-temps'
  },
  actions: [
    {
        id: 'save',
        label: 'Save',
        type: 'primary',
        validateFields: [
            'npwp.number', 'npwp.address', 'npwp.file',
            'taxpayer.taxpayerStatus', 'taxpayer.publishedDate', 'taxpayer.file',
            'deedOfEstablishment.number', 'deedOfEstablishment.publishedDate', 'deedOfEstablishment.file',
            'deedOfAmendment.number', 'deedOfAmendment.publishedDate', 'deedOfAmendment.file',
            'organizationStructure.file'
        ]
    }
  ],
  sections: [
    {
        id: DocumentConstants.SECTION_DOCUMENT_NPWP_ID,
        code: DocumentConstants.SECTION_DOCUMENT_NPWP_CODE,
        title: DocumentConstants.SECTION_DOCUMENT_NPWP_TITLE,
        description: DocumentConstants.SECTION_DOCUMENT_NPWP_DESCRIPTION,
        layout: FormLayout.CARD,
        fields: [
            textField({
                name: 'npwp.number',
                label: 'NPWP',
                grid: HalfGrid,
                validation: { required: RequiredValidation.required }
            }),
            textareaField({
                name: 'npwp.address',
                label: 'Address',
                grid: FullGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'npwp.file',
                label: 'Attachment',
                grid: FullGrid,
                file: {
                    documentTypeCode: DocumentType.NPWP
                },
                validation: { required: RequiredValidation.required },
                payload: {
                    key: 'npwp.fileId',
                    pick: 'id'
                }
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
                name: 'taxpayer.taxpayerStatus',
                label: 'Taxpayer Status',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required },
                options: [
                    { label: 'PKP', value: 'PKP' },
                    { label: 'NON PKP', value: 'NON_PKP' }
                ]
            }),
            dateField({
                name: 'taxpayer.publishedDate',
                label: 'Date',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'taxpayer.file',
                label: 'Attachment',
                grid: FullGrid,
                file: {
                    documentTypeCode: DocumentType.TAXPAYER_STATUS
                },
                validation: { required: RequiredValidation.required },
                payload: {
                    key: 'taxpayer.fileId',
                    pick: 'id'
                }
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
                name: 'deedOfEstablishment.number',
                label: 'No',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required },
            }),
            dateField({
                name: 'deedOfEstablishment.publishedDate',
                label: 'Date',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'deedOfEstablishment.file',
                label: 'Attachment',
                grid: FullGrid,
                file: {
                    documentTypeCode: DocumentType.DEED_OF_ESTABLISHMENT
                },
                validation: { required: RequiredValidation.required },
                payload: {
                    key: 'deedOfEstablishment.fileId',
                    pick: 'id'
                }
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
                name: 'deedOfAmendment.number',
                label: 'No',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required },
            }),
            dateField({
                name: 'deedOfAmendment.publishedDate',
                label: 'Date',
                grid: ThirdGrid,
                validation: { required: RequiredValidation.required }
            }),
            fileField({
                name: 'deedOfAmendment.file',
                label: 'Attachment',
                grid: FullGrid,
                file: {
                    documentTypeCode: DocumentType.DEED_OF_AMENDMENT
                },
                validation: { required: RequiredValidation.required },
                payload: {
                    key: 'deedOfAmendment.fileId',
                    pick: 'id'
                }
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
                name: 'organizationStructure.file',
                label: 'Attachment',
                grid: FullGrid,
                file: {
                    documentTypeCode: DocumentType.ORGANIZATIONAL_STRUCTURE
                },
                validation: { required: RequiredValidation.required },
                payload: {
                    key: 'organizationStructure.fileId',
                    pick: 'id'
                }
            }),
        ]
    },
  ]
};
