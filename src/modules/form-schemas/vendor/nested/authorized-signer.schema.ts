import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout, ConditionOperator } from '../../../dynamic-form-v2/enums'
import { IdentityLookup, CountryLookup } from '../../shared'
import { DocumentTypeConstant } from '../../shared/constants'

export const authorizedSignerSchema: FormSchema = {
    id: 'authorized-signer',
    code: 'authorized-signer',
    title: 'Authorized Signer',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'authorized-signer-sec',
            code: 'authorized-signer-sec',
            title: 'Authorized Signer Details',
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
                },
                {
                    id: 'hasAuthorityLimitation',
                    code: 'hasAuthorityLimitation',
                    name: 'hasAuthorityLimitation',
                    label: 'Has Authority Limitation?',
                    type: FieldType.SWITCH,
                    component: 'DEFAULT'
                },
                {
                    id: 'authorityLimitationAmount',
                    code: 'authorityLimitationAmount',
                    name: 'authorityLimitationAmount',
                    label: 'Authority Limitation Amount',
                    type: FieldType.CURRENCY,
                    component: 'DEFAULT',
                    display: {
                        visible: {
                            operator: 'AND',
                            conditions: [
                                {
                                    field: 'hasAuthorityLimitation',
                                    operator: ConditionOperator.EQUALS,
                                    value: true
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}
