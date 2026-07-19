import { 
  FormSchema, 
  FormLayout, 
  textField, 
  emailField, 
  phoneField, 
  dateField, 
  textareaField, 
  autocompleteField 
} from '@/modules/dynamic-form-v2';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { HalfGrid } from '@/modules/dynamic-form-v2/grids';
import { IdentityLookup, JobTypeLookup, PhoneVerification, TitleLookup } from '@/modules/form-schemas/shared';
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
            lookup: TitleLookup
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
            lookup: JobTypeLookup
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
