import { 
  FormSchema, 
  FormLayout, 
  textField, 
  emailField, 
  phoneField, 
  autocompleteField, 
  fileField, 
  checkboxField, 
  textareaField,
  ConditionOperator,
  dateField,
  LogicalOperator,
  formField,
  FieldType
} from '@/modules/dynamic-form-v2';
import {  RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { FullGrid, HalfGrid } from '@/modules/dynamic-form-v2/grids';
import { DocumentType, PersonnelConstants, PersonnelType } from '../../common';
import { IdentityLookup, JobTypeLookup, PrivyVerification, TitleLookup } from '@/modules/form-schemas/shared';
import { AuthorizedSignerDocumentSchema } from './authorized-signer-document.schema';

const authorizedSignerDocumentsField = formField({
  name: 'authorizedSignerDocuments',
  label: 'Authorized Signer Documents',
  grid: FullGrid,
  nested: {
    multiple: true,
    schema: AuthorizedSignerDocumentSchema
  }
});
authorizedSignerDocumentsField.type = FieldType.AUTHORIZED_SIGNER_DOCUMENT_NESTED;

export const AuthorizedSignerSchema: FormSchema = {
  id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
  title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
  code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
      title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
      code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'title',
            label: 'Title',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: TitleLookup,
            payload: {
                key: 'titleId',
                pick: 'id'
            }
        }),
        textField({
            name: 'fullName',
            label: 'Full Name',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        autocompleteField({
            name: 'jobType',
            label: 'Job Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: JobTypeLookup,
            payload: {
                key: 'jobTypeId',
                pick: 'id'
            }
        }),
        textField({
            name: 'position',
            label: 'Position',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        autocompleteField({
            name: 'identityType',
            label: 'Identity Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: IdentityLookup,
            payload: {
                key: 'identityTypeId',
                pick: 'id'
            }
        }),
        textField({
            name: 'identityNumber',
            label: 'Identity Number',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        emailField({
            name: 'email',
            label: 'Email',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        textField({
            name: 'privyId',
            label: 'Privy Id',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            verification: PrivyVerification
        }),
        checkboxField({ 
            name: 'hasAuthorityLimitation', 
            label: 'Has Authority Limitation', 
            grid: FullGrid 
        }),
        textareaField({ 
            name: 'authorityDescription', 
            label: 'Authority Description', 
            grid: FullGrid,
            validation: {
                required: RequiredValidation.required
            },
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'hasAuthorityLimitation',
                            operator: ConditionOperator.EQUALS,
                            value: true
                        }
                    ]
                }
            }
        }),
        fileField({ 
            name: 'authorityDocument', 
            label: 'Authority Document', 
            grid: HalfGrid, 
            file: { 
                documentTypeCode: DocumentType.OTHER 
            },
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'hasAuthorityLimitation',
                            operator: ConditionOperator.EQUALS,
                            value: true
                        }
                    ]
                }
            },
            payload: {
                key: 'fileId',
                pick: 'id'
            }
        }),
        dateField({ 
            name: 'authorityExpiredDate', 
            label: 'Authority Expired Date', 
            grid: HalfGrid,
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'hasAuthorityLimitation',
                            operator: ConditionOperator.EQUALS,
                            value: true
                        }
                    ]
                }
            }
        }),
      ]
    },
    {
          id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_ID,
          code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_CODE,
          layout: FormLayout.CARD,
          fields: [
            authorizedSignerDocumentsField
          ]
        }
  ]
};
