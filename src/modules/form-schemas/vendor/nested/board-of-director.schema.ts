import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { IdentityLookup, CountryLookup } from '../../shared'
import { DocumentTypeConstant } from '../../shared/constants'

export const boardOfDirectorSchema: FormSchema = {
    id: 'board-of-director',
    code: 'board-of-director',
    title: 'Board of Director',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'board-of-director-sec',
            code: 'board-of-director-sec',
            title: 'BOD Details',
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
                    id: 'position',
                    code: 'position',
                    name: 'position',
                    label: 'Position',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
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
