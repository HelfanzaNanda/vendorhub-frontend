import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { DocumentTypeConstant } from '../../shared/constants'
import { CountryLookup } from '../../shared'

export const vendorCompanySchema: FormSchema = {
    id: 'vendor-company',
    code: 'vendor-company',
    title: 'Company Information',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'company-details',
            code: 'company-details',
            title: 'Company Details',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'companyName',
                    code: 'companyName',
                    name: 'companyName',
                    label: 'Company Name',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true, maxLength: 200 }
                },
                {
                    id: 'companyProfile',
                    code: 'companyProfile',
                    name: 'companyProfile',
                    label: 'Company Profile',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: {
                        documentTypeCode: DocumentTypeConstant.COMPANY_PROFILE
                    }
                },
                {
                    id: 'countryId',
                    code: 'countryId',
                    name: 'countryId',
                    label: 'Country',
                    type: FieldType.AUTOCOMPLETE,
                    component: 'DEFAULT',
                    lookup: CountryLookup,
                    validation: { required: true }
                }
            ]
        }
    ]
}
