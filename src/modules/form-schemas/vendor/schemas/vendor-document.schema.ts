import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { DocumentTypeConstant } from '../../shared/constants'

export const vendorDocumentSchema: FormSchema = {
    id: 'vendor-document',
    code: 'vendor-document',
    title: 'Other Documents',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'document-sec',
            code: 'document-sec',
            title: 'General Documents',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'npwpFileId',
                    code: 'npwpFileId',
                    name: 'npwpFileId',
                    label: 'NPWP Document',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.NPWP }
                },
                {
                    id: 'nibFileId',
                    code: 'nibFileId',
                    name: 'nibFileId',
                    label: 'NIB Document',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.NIB }
                }
            ]
        }
    ]
}
