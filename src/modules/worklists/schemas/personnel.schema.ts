import { WorklistDataGroupSchema } from './types'

export const worklistPersonnelGroups: WorklistDataGroupSchema[] = [
  {
    id: 'BOARD_OF_DIRECTORS',
    title: 'Board of Directors',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=BOARD_OF_DIRECTORS',
    isMultiple: true,
    reviewSectionId: 'personnel',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'position', label: 'Position' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'phone', label: 'Phone', type: 'phone' },
          { id: 'idNumber', label: 'ID Number' },
        ]
      }
    ]
  },
  {
    id: 'SHAREHOLDER',
    title: 'Shareholders',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=SHAREHOLDER',
    isMultiple: true,
    reviewSectionId: 'personnel',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'position', label: 'Position' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'phone', label: 'Phone', type: 'phone' },
          { id: 'idNumber', label: 'ID Number' },
        ]
      }
    ]
  },
  {
    id: 'AUTHORIZED_SIGNER',
    title: 'Authorized Signers',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=AUTHORIZED_SIGNER',
    isMultiple: true,
    reviewSectionId: 'personnel',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'position', label: 'Position' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'phone', label: 'Phone', type: 'phone' },
          { id: 'idNumber', label: 'ID Number' },
        ]
      }
    ]
  },
]
