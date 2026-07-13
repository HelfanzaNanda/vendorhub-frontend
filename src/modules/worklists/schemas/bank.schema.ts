import { WorklistDataGroupSchema } from './types'

export const worklistBankGroup: WorklistDataGroupSchema = {
  id: 'bank',
  title: 'Bank Information',
  endpoint: '/worklists/:workflowTransactionId?tab=banks',
  isMultiple: true,
  reviewSectionId: 'VENDOR_BANK',
  card: {
    titleField: 'accountName',
    subtitleField: 'accountNumber',
  },
  sections: [
    {
      id: 'bank-info',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'bankBranch.bank.country.name', label: 'Country' },
        { id: 'bankBranch.bank.name', label: 'Bank' },
        { id: 'bankBranch.name', label: 'Bank Branch' },
        { id: 'currency.name', label: 'Currency' },
        { id: 'accountNumber', label: 'Account Number' },
        { id: 'accountName', label: 'Account Name' },
        { id: 'file.fileName', label: 'File', component: 'file', width: 12 },
      ]
    }
  ]
}
