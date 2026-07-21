import { 
  FormSchema, 
  FormLayout, 
  textField, 
  emailField, 
  phoneField, 
  dateField, 
  textareaField, 
  autocompleteField 
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { HalfGrid } from '@/modules/form-engine/grids';
import { IdentityLookup, JobTypeLookup, PhoneVerification, TitleLookup } from '@/modules/vendors/shared';
import { PersonnelConstants } from '../../common';

export const BoardOfDirectorSchema: FormSchema = {
  id: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_ID,
  title: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
  code: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_ID,
      title: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
      code: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_CODE,
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
            name: 'name',
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
        phoneField({
            name: 'phone',
            label: 'Phone',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            verification: PhoneVerification
        }),
      ]
    }
  ]
};
