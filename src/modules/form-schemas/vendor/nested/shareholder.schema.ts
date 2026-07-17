import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { IdentityLookup, CountryLookup } from '../../shared'
import { DocumentTypeConstant } from '../../shared/constants'

export const shareholderSchema: FormSchema = {
    id: 'shareholder',
    code: 'shareholder',
    title: 'Shareholder',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'shareholder-sec',
            code: 'shareholder-sec',
            title: 'Shareholder Details',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'name',
                    code: 'name',
                    name: 'name',
                    label: 'Name',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'percentage',
                    code: 'percentage',
                    name: 'percentage',
                    label: 'Ownership Percentage',
                    type: FieldType.PERCENTAGE,
                    component: 'DEFAULT',
                    validation: { required: true, max: 100 }
                },
                {
                    id: 'identityTypeId',
                    code: 'identityTypeId',
                    name: 'identityTypeId',
                    label: 'Identity Type',
                    type: FieldType.SELECT,
                    component: 'DEFAULT',
                    lookup: IdentityLookup,
                    validation: { required: true }
                },
                {
                    id: 'identityNumber',
                    code: 'identityNumber',
                    name: 'identityNumber',
                    label: 'Identity Number',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'nationalityId',
                    code: 'nationalityId',
                    name: 'nationalityId',
                    label: 'Nationality',
                    type: FieldType.AUTOCOMPLETE,
                    component: 'DEFAULT',
                    lookup: CountryLookup,
                    validation: { required: true }
                },
                {
                    id: 'identityFileId',
                    code: 'identityFileId',
                    name: 'identityFileId',
                    label: 'Identity Document',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: {
                        documentTypeCode: DocumentTypeConstant.IDENTITY_DOCUMENT
                    }
                }
            ]
        }
    ]
}
