import { 
  FormSchema, 
  FormLayout, 
  textField, 
  percentageField, 
  selectField, 
  ConditionOperator,
  numberField
} from '@/modules/dynamic-form-v2';
import { PersonnelConstants } from '../constants';
import { RequiredValidation, TitleLookup, HalfGrid, QuarterGrid, IdentityLookup, Operator } from '@/modules/form-schemas/shared';

export const ShareholderSchema: FormSchema = {
  id: PersonnelConstants.SECTION_SHAREHOLDER_ID,
  title: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
  code: PersonnelConstants.SECTION_SHAREHOLDER_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: PersonnelConstants.SECTION_SHAREHOLDER_ID,
      title: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
      code: PersonnelConstants.SECTION_SHAREHOLDER_CODE,
      description: PersonnelConstants.SECTION_SHAREHOLDER_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        selectField({
            name: 'title',
            label: 'Title',
            validation: { required: RequiredValidation.required }, 
            grid: QuarterGrid,
            lookup: TitleLookup
        }),
        textField({
            name: 'fullName',
            label: 'Full Name',
            validation: { required: RequiredValidation.required }, 
            grid: QuarterGrid
        }),
        textField({
            name: 'position',
            label: 'Position',
            validation: { required: RequiredValidation.required }, 
            grid: QuarterGrid,
            visibility: {
                condition : {
                    field: 'title',
                    operator: ConditionOperator.NOT_EQUALS,
                    value: 'Perusahaan'
                }
            }
        }),
        selectField({
            name: 'identityType',
            label: 'Identity Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: IdentityLookup,
            visibility: {
                condition : {
                    field: 'title',
                    operator: ConditionOperator.NOT_EQUALS,
                    value: 'Perusahaan'
                }
            }
        }),
        textField({
            name: 'identityNumber',
            label: 'Identity Number',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            visibility: {
                condition : {
                    field: 'title',
                    operator: ConditionOperator.NOT_EQUALS,
                    value: 'Perusahaan'
                }
            }
        }),
        numberField({
            name: 'identityNumber',
            label: 'NPWP',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            visibility: {
                condition : {
                    field: 'title',
                    operator: ConditionOperator.EQUALS,
                    value: 'Perusahaan'
                }
            }
        }),
        percentageField({ 
            name: 'ownershipPercentage', 
            label: 'Ownership Percentage', 
            validation: { required: RequiredValidation.required }, 
            grid: QuarterGrid
        }),
      ]
    }
  ]
};
