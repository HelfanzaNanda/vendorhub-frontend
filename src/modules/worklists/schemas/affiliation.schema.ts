import { WorklistDataGroupSchema } from './types'

export const worklistAffiliationGroup: WorklistDataGroupSchema = {
  id: 'affiliation',
  title: 'Affiliation',
  endpoint: '/worklists/:workflowTransactionId?tab=affiliations',
  isMultiple: true,
  reviewSectionId: 'VENDOR_AFFILIATION',
  card: {
    titleField: 'companyName',
    subtitleField: 'npwp',
  },
  sections: [
    {
      id: 'affiliation-info',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'companyName', label: 'Company Name' },
        { id: 'affiliateType.name', label: 'Affiliation Type' },
        { id: 'npwp', label: 'NPWP' },
        { id: 'businessField', label: 'businessField' },
      ]
    }
  ]
}
