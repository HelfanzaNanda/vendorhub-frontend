import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { IndustryLookup } from '../../shared'
import { DocumentTypeConstant } from '../../shared/constants'

export const vendorBusinessLicenseSchema: FormSchema = {
    id: 'vendor-business-license',
    code: 'vendor-business-license',
    title: 'Business License',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'business-license-sec',
            code: 'business-license-sec',
            title: 'Business License Details',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'industryId',
                    code: 'industryId',
                    name: 'industryId',
                    label: 'Industry',
                    type: FieldType.SELECT,
                    component: 'DEFAULT',
                    lookup: IndustryLookup,
                    validation: { required: true }
                },
                {
                    id: 'licenseFileId',
                    code: 'licenseFileId',
                    name: 'licenseFileId',
                    label: 'License Document',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.BUSINESS_LICENSE },
                    validation: { required: true }
                },
                {
                    id: 'issueDate',
                    code: 'issueDate',
                    name: 'issueDate',
                    label: 'Issue Date',
                    type: FieldType.DATE,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'expiredDate',
                    code: 'expiredDate',
                    name: 'expiredDate',
                    label: 'Expired Date',
                    type: FieldType.DATE,
                    component: 'DEFAULT'
                }
            ]
        }
    ]
}
