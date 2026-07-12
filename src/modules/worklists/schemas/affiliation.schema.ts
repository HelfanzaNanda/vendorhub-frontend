import { WorklistDataGroupSchema } from './types'

export const worklistAffiliationGroup: WorklistDataGroupSchema = {
  id: 'affiliation',
  title: 'Affiliation',
  endpoint: '/worklists/:workflowTransactionId?tab=affiliation',
  isMultiple: true,
  reviewSectionId: 'affiliation',
  card: {
    titleField: 'name',
    subtitleField: 'address',
  },
  sections: [
    {
      id: 'affiliation-info',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'vendorType.name', label: 'Vendor Type' },
        { id: 'affiliationType', label: 'Affiliation Type' },
        { id: 'name', label: 'Name' },
        { id: 'address', label: 'Address' },
        { id: 'file.fileName', label: 'File', component: 'file', width: 12 },
      ]
    }
  ]
}
