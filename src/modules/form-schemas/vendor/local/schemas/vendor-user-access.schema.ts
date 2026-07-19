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
    fileField,
    tableField,
    DateUtil
} from '@/modules/dynamic-form-v2';

import { UserAccessConstants, UserAccessStatus } from '@/modules/form-schemas/vendor/common';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { FullGrid, HalfGrid, QuarterGrid, ThirdGrid, TwoThirdsGrid } from '@/modules/dynamic-form-v2/grids';
import { RoleLookup, PositionLookup, AreaLookup, PhoneVerification, EmailVerification } from '@/modules/form-schemas/shared';
import { PhoneVerifyVerification } from '@/modules/form-schemas/shared/verification/phone.verification';
import { VendorUserAccessTable } from '@/modules/form-schemas/shared/tables/vendor-user-access.table';


const UserAccessSchema: FormSchema = {
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
                    grid: FullGrid,
                    validation: { required: RequiredValidation.required },
                    verification: PhoneVerifyVerification
                }),
                emailField({
                    name: 'email',
                    label: 'Email',
                    validation: { required: RequiredValidation.required },
                    grid: ThirdGrid,
                    verification: EmailVerification
                }),

                dateField({
                    name: 'effectiveEndDate',
                    label: 'Effective End Date',
                    grid: HalfGrid,
                    validation: { required: RequiredValidation.required },
                    props: {
                        minDate: DateUtil.today(),
                        maxDate: DateUtil.plusYears(3)
                    }
                }),

                autocompleteField({
                    name: 'roleIds',
                    label: 'Role',
                    validation: { required: RequiredValidation.required },
                    grid: HalfGrid,
                    multiple: true,
                    lookup: RoleLookup
                }),

                autocompleteField({
                    name: 'areaIds',
                    label: 'Working Area',
                    validation: { required: RequiredValidation.required },
                    grid: HalfGrid,
                    multiple: true,
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


export const VendorUserAccessTableSchema: FormSchema = {
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
            layout: FormLayout.TABLE,
            fields: [
                tableField({
                    name: UserAccessConstants.SECTION_USER_ACCESS_ID,
                    label: UserAccessConstants.SECTION_USER_ACCESS_TITLE,
                    helperText: UserAccessConstants.SECTION_USER_ACCESS_DESCRIPTION,
                    grid: FullGrid,
                    table: VendorUserAccessTable,
                    schema: UserAccessSchema,
                    validation: {
                        required: RequiredValidation.required
                    }
                })
            ]
        }
    ]
}
