import type { WorklistDataGroupSchema } from './types'

export const worklistDocumentGroups: WorklistDataGroupSchema[] = [
  {
  id: 'document-npwp',
  title: 'Document (NPWP)',
  endpoint: '/worklists/:workflowTransactionId?tab=documents&documentType=NPWP',
  isMultiple: false,
  reviewSectionId: 'VENDOR_DOCUMENT',
  
  sections: [
    {
      id: 'document-npwp',
      fields: [
        { id: 'documentNumber', label: 'Tax ID (NPWP)' },
        { id: 'address', label: 'Address' },
        { id: 'file.fileName', label: 'File', component: 'file' },
      ]
    },
  ]
},
 {
  id: 'document-tax-payer-status',
  title: 'Tax Payer Status',
  endpoint: '/worklists/:workflowTransactionId?tab=documents&documentType=TAXPAYER_STATUS',
  isMultiple: false,
  reviewSectionId: 'VENDOR_DOCUMENT',
  sections: [
    {
      id: 'document-tax-payer-status',
      fields: [
        { id: 'taxpayerStatus', label: 'Tax Payer Status' },
        { id: 'publishDate', label: 'Published Date', component: 'date' },
        { id: 'file.fileName', label: 'File', component: 'file' },
      ]
    },
  ]
},
{
  id: 'deed-of-establishment',
  title: 'Deed of Establishment',
  endpoint: '/worklists/:workflowTransactionId?tab=documents&documentType=DEED_OF_ESTABLISHMENT',
  isMultiple: false,
  reviewSectionId: 'VENDOR_DOCUMENT',
  sections: [
    {
      id: 'deed-of-establishment',
      fields: [
        { id: 'documentNumber', label: 'Number' },
        { id: 'publishDate', label: 'Published Date', component: 'date' },
        { id: 'file.fileName', label: 'File', component: 'file' },
      ]
    },
  ]
},
{
  id: 'deed-of-amendment',
  title: 'Deed of Amendment',
  endpoint: '/worklists/:workflowTransactionId?tab=documents&documentType=DEED_OF_AMENDMENT',
  isMultiple: false,
  reviewSectionId: 'VENDOR_DOCUMENT',
  sections: [
    {
      id: 'deed-of-amendment',
      fields: [
        { id: 'documentNumber', label: 'Number' },
        { id: 'publishDate', label: 'Published Date', component: 'date' },
        { id: 'file.fileName', label: 'File', component: 'file' },
      ]
    },
  ]
},
{
  id: 'organizational-structure',
  title: 'Organizational Structure',
  endpoint: '/worklists/:workflowTransactionId?tab=documents&documentType=ORGANIZATIONAL_STRUCTURE',
  isMultiple: false,
  reviewSectionId: 'VENDOR_DOCUMENT',
  sections: [
    {
      id: 'organizational-structure',
      fields: [
        { id: 'file.fileName', label: 'File', component: 'file' },
      ]
    },
  ]
}

]
