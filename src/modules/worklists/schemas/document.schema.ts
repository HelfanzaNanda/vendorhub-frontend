import { WorklistDataGroupSchema } from './types'

export const worklistDocumentGroup: WorklistDataGroupSchema = {
  id: 'document',
  title: 'Document Information',
  endpoint: '/worklists/:workflowTransactionId?tab=documents',
  isMultiple: false,
  reviewSectionId: 'document',
  sections: [
    {
      id: 'document-info',
      fields: [
        { id: 'taxId', label: 'Tax ID (NPWP)' },
        { id: 'npwpFile', label: 'NPWP Document', type: 'file' },
        { id: 'spkpFile', label: 'SPKP Document', type: 'file' },
        { id: 'sppkpFile', label: 'SPPKP Document', type: 'file' },
        { id: 'nibNumber', label: 'NIB Number' },
        { id: 'nibFile', label: 'NIB Document', type: 'file' },
      ]
    }
  ]
}
