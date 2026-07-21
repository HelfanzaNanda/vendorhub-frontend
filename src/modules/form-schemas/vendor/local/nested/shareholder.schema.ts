import { 
  FormSchema, 
  FormLayout, 
  textField, 
  percentageField, 
  autocompleteField, 
  ConditionOperator,
  numberField,
  LogicalOperator
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { AutoGrid, FullGrid, HalfGrid, QuarterGrid, ThirdGrid } from '@/modules/form-engine/grids';
import { PersonnelConstants } from '../../common';
import { IdentityLookup, TitleLookup } from '@/modules/form-schemas/shared';

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
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'title',
            label: 'Title',
            validation: { required: RequiredValidation.required }, 
            grid: QuarterGrid,
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
            grid: AutoGrid
        }),
        textField({
            name: 'position',
            label: 'Position',
            validation: { required: RequiredValidation.required }, 
            grid: ThirdGrid,
            visibility: {
                condition : {
                    field: 'title.label',
                    operator: ConditionOperator.NOT_EQUALS,
                    value: 'Perusahaan'
                }
            }
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
            },
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'title.label',
                            operator: ConditionOperator.NOT_EQUALS,
                            value: 'Perusahaan'
                        }
                    ]
                }
            }
        }),
        textField({
            name: 'identityNumber',
            label: 'Identity Number',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'title.label',
                            operator: ConditionOperator.NOT_EQUALS,
                            value: 'Perusahaan'
                        }
                    ]
                }
            }
        }),
        numberField({
            name: 'npwp',
            label: 'NPWP',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'title.label',
                            operator: ConditionOperator.EQUALS,
                            value: 'Perusahaan'
                        }
                    ]
                }
            }
        }),
        percentageField({ 
            name: 'ownershipPercentage', 
            label: 'Ownership Percentage', 
            validation: { required: RequiredValidation.required }, 
            grid: FullGrid
        }),
      ]
    }
  ]
};
