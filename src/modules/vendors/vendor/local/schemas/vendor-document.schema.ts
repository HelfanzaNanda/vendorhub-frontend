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
import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useDynamicFormContext } from '@/modules/form-engine/context';
import { createCrudService } from '@/modules/form-engine/services/vendor-crud.service';
import { toast } from 'sonner';

export const VendorDocumentSchema: FormSchema = {
  id: DocumentConstants.SCHEMA_ID,
  title: DocumentConstants.SCHEMA_TITLE,
  code: DocumentConstants.SCHEMA_CODE,
  layout: FormLayout.DEFAULT,
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

export const SaveDocumentButton = () => {
    const context = useDynamicFormContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!context?.validate()) {
            return;
        }

        setIsLoading(true);
        try {
            const payload = context.buildPayload();
            const service = createCrudService('/vendor-document');
            await service.save(payload);
            toast.success('Document saved successfully');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'Failed to save Document');
        } finally {
            setIsLoading(false);
        }
    };

    return React.createElement(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 3 } }, 
        React.createElement(Button, { 
            variant: 'contained', 
            onClick: handleSave, 
            disabled: isLoading,
            startIcon: isLoading ? React.createElement(CircularProgress, { size: 20, color: 'inherit' }) : undefined
        }, isLoading ? 'Saving...' : 'Save')
    );
};
