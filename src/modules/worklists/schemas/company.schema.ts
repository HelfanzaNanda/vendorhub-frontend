import type { WorklistDataGroupSchema } from './types'

export const worklistCompanyGroup: WorklistDataGroupSchema = {
  id: 'company',
  title: 'Company Information',
  endpoint: '/worklists/:workflowTransactionId?tab=company',
  isMultiple: false,
  reviewSectionId: 'VENDOR_COMPANY',
  sections: [
    {
      id: 'company-info',
      title: 'General Information',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'companyName', label: 'Company Name' },
        { id: 'site.name', label: 'Site' },
        { id: 'businessType.code', label: 'Business Type' },
        { id: 'staffCount', label: 'Staff Count', formatter: 'currency' }, // example formatter reuse
      ]
    },
    {
      id: 'company-address',
      title: 'Address Information',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'address', label: 'Address', width: 12 },
        { id: 'country.name', label: 'Country' },
        { id: 'province.name', label: 'Province' },
        { id: 'city.name', label: 'City' },
        { id: 'postalCode', label: 'Postal Code' },
        { id: 'website', label: 'Website', component: 'link' },
        { id: 'mapUrl', label: 'Link MAP', component: 'link' },
      ]
    }
  ]
}
