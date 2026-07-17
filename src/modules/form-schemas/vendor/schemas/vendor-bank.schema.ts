import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums'
import { BankLookup, CurrencyLookup } from '../../shared'
import { DocumentTypeConstant } from '../../shared/constants'

export const vendorBankSchema: FormSchema = {
    id: 'vendor-bank',
    code: 'vendor-bank',
    title: 'Bank Information',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'bank-details',
            code: 'bank-details',
            title: 'Bank Details',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'bankId',
                    code: 'bankId',
                    name: 'bankId',
                    label: 'Bank Name',
                    type: FieldType.AUTOCOMPLETE,
                    component: 'DEFAULT',
                    lookup: BankLookup,
                    validation: { required: true }
                },
                {
                    id: 'accountName',
                    code: 'accountName',
                    name: 'accountName',
                    label: 'Account Name',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'accountNumber',
                    code: 'accountNumber',
                    name: 'accountNumber',
                    label: 'Account Number',
                    type: FieldType.TEXT,
                    component: 'DEFAULT',
                    validation: { required: true }
                },
                {
                    id: 'currencyId',
                    code: 'currencyId',
                    name: 'currencyId',
                    label: 'Currency',
                    type: FieldType.SELECT,
                    component: 'DEFAULT',
                    lookup: CurrencyLookup,
                    validation: { required: true }
                },
                {
                    id: 'bankStatementFile',
                    code: 'bankStatementFile',
                    name: 'bankStatementFile',
                    label: 'Bank Statement',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.BANK_STATEMENT },
                    validation: { required: true }
                }
            ]
        }
    ]
}
