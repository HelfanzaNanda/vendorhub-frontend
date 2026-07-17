import { FormSchema } from '@/modules/dynamic-form-v2'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { DocumentTypeConstant } from '../../shared/constants'

export const customerReferenceSchema: FormSchema = {
    id: 'customer-reference',
    code: 'customer-reference',
    title: 'Customer Reference',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'customer-reference-sec',
            code: 'customer-reference-sec',
            title: 'Customer Reference Details',
            layout: FormLayout.TABLE,
            fields: [
                {
                    id: 'referenceNumber',
                    code: 'referenceNumber',
                    name: 'referenceNumber',
                    label: 'Reference Number',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'projectName',
                    code: 'projectName',
                    name: 'projectName',
                    label: 'Project Name',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'description',
                    code: 'description',
                    name: 'description',
                    label: 'Description',
                    type: FieldType.TEXTAREA,
                    component: 'DEFAULT'
                },
                {
                    id: 'fileId',
                    code: 'fileId',
                    name: 'fileId',
                    label: 'Attachment',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: {
                        documentTypeCode: DocumentTypeConstant.CUSTOMER_REFERENCE
                    }
                }
            ]
        }
    ]
}
