import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  emailField, 
  phoneField, 
  autocompleteField, 
  switchField, 
  textareaField, 
  dateField,
  fileField
} from '@/modules/dynamic-form-v2';

import { UserAccessConstants, UserAccessStatus } from '@/modules/form-schemas/vendor/common';
import { RoleLookup, DepartmentLookup, AreaLookup, PositionLookup } from '@/modules/form-schemas/shared/lookups';
import { HalfGrid, RequiredValidation } from '@/modules/form-schemas/shared';

export const UserAccessSchema: FormSchema = {
  id: UserAccessConstants.SCHEMA_ID,
  title: UserAccessConstants.SCHEMA_TITLE,
  code: UserAccessConstants.SCHEMA_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: UserAccessConstants.SECTION_USER_ACCESS_ID,
      title: UserAccessConstants.SECTION_USER_ACCESS_TITLE,
      code: UserAccessConstants.SECTION_USER_ACCESS_CODE,
      description: UserAccessConstants.SECTION_USER_ACCESS_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        textField({
            name: 'firstName',
            label: 'First Name',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid
        }),
        textField({
            name: 'lastName',
            label: 'Last Name',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid
        }),
        textField({
            name: 'jobTitle',
            label: 'Job Title',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid
        }),

        autocompleteField({
            name: 'position',
            label: 'Position',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: PositionLookup
        }),

        phoneField({
            name: 'phone',
            label: 'Phone',
            grid: HalfGrid,
            validation: { required: RequiredValidation.required },
        }),
        emailField({
            name: 'email',
            label: 'Email',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid
        }),

        dateField({
            name: 'effectiveEndDate',
            label: 'Effective End Date',
            grid: HalfGrid,
            validation: { required: RequiredValidation.required },
        }),
        
        autocompleteField({
            name: 'roleIds',
            label: 'Role',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        //   multiple: true,
            lookup: RoleLookup
        }),

        autocompleteField({
            name: 'areaIds',
            label: 'Working Area',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        //   multiple: true,
            lookup: AreaLookup
        }),
        fileField({ 
            name: 'fileId', 
            label: 'Uploaded File', 
            grid: HalfGrid, 
            props: { 
                documentType: UserAccessConstants.DOCUMENT_ID 
            }
        }),
      ]
    }
  ]
};
