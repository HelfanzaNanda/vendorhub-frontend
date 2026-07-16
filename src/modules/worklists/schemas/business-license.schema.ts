import type { WorklistDataGroupSchema } from './types'

export const worklistBusinessLicenseGroup: WorklistDataGroupSchema = {
  id: 'business-license',
  title: 'Business License',
  endpoint: '/worklists/:workflowTransactionId?tab=business-licenses',
  isMultiple: false,
  reviewSectionId: 'VENDOR_BUSINESS_LICENSE',
  sections: [
    {
      id: 'license-info',
      fields: [
        { id: 'number', label: 'License Number' },
        { id: 'industryClassificationNumbers', label: 'Industry Classification Numbers' },
        { id: 'file.fileName', label: 'FIle', component: 'file' },
      ]
    }
  ]
}
