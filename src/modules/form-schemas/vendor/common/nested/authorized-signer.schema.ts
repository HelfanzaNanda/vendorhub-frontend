import { 
  FormSchema, 
  FormLayout, 
  textField, 
  emailField, 
  phoneField, 
  selectField, 
  fileField, 
  checkboxField, 
  textareaField,
  ConditionOperator,
  dateField
} from '@/modules/dynamic-form-v2';
import { DocumentType, PersonnelConstants, PersonnelType } from '../constants';
import { FullGrid, HalfGrid, IdentityLookup, JobTypeLookup, RequiredValidation, TitleLookup } from '@/modules/form-schemas/shared';

export const AuthorizedSignerSchema: FormSchema = {
  id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
  title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
  code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
      title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
      code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
      description: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        selectField({
            name: 'title',
            label: 'Title',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: TitleLookup
        }),
        textField({
            name: 'fullName',
            label: 'Full Name',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        selectField({
            name: 'jobType',
            label: 'Job Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: JobTypeLookup
        }),
        textField({
            name: 'position',
            label: 'Position',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid
        }),
        selectField({
            name: 'identityType',
            label: 'Identity Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: IdentityLookup
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
            grid: HalfGrid
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
            visibility: {
                condition: {
                    field: 'hasAuthorityLimitation',
                    operator: ConditionOperator.EQUALS,
                    value: true
                }
            }
        }),
        fileField({ 
            name: 'authorityDocument', 
            label: 'Authority Document', 
            grid: HalfGrid, 
            props: { 
                documentType: PersonnelType.AUTHORIZED_SIGNER 
            },
            visibility: {
                condition: {
                    field: 'hasAuthorityLimitation',
                    operator: ConditionOperator.EQUALS,
                    value: true
                }
            }
        }),
        dateField({ 
            name: 'authorityExpiredDate', 
            label: 'Authority Expired Date', 
            grid: HalfGrid,
            visibility: {
                condition: {
                    field: 'hasAuthorityLimitation',
                    operator: ConditionOperator.EQUALS,
                    value: true
                }
            }
        }),
      ]
    }
  ]
};
