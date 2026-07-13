import { WorklistDataGroupSchema } from './types'

export const worklistBusinessLicenseGroup: WorklistDataGroupSchema = {
  id: 'business-license',
  title: 'Business License',
  endpoint: '/worklists/:workflowTransactionId?tab=business-licenses',
  isMultiple: true,
  reviewSectionId: 'VENDOR_BUSINESS_LICENSE',
  sections: [
    {
      id: 'license-info',
      fields: [
        { id: 'licenseType', label: 'License Type' },
        { id: 'licenseNumber', label: 'License Number' },
        { id: 'issuedBy', label: 'Issued By' },
        { id: 'issuedDate', label: 'Issued Date', type: 'date' },
        { id: 'expiredDate', label: 'Expired Date', type: 'date' },
      ]
    }
  ]
}
