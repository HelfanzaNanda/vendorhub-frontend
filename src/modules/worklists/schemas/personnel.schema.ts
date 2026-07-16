import type { WorklistDataGroupSchema } from './types'

export const worklistPersonnelGroups: WorklistDataGroupSchema[] = [
  {
    id: 'BOARD_OF_DIRECTORS',
    title: 'Board of Directors',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=BOARD_OF_DIRECTORS',
    isMultiple: true,
    reviewSectionId: 'VENDOR_PERSONNEL',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'jobType.name', label: 'Job Type' },
          { id: 'position', label: 'Position' },
          { id: 'identityType.name', label: 'Identity Type' },
          { id: 'identityNumber', label: 'Identity Number' },
          { id: 'email', label: 'Email' },
          { id: 'phone', label: 'Phone', formatter: 'phone' },
        ]
      }
    ]
  },
  {
    id: 'SHAREHOLDER',
    title: 'Shareholders',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=SHAREHOLDER',
    isMultiple: true,
    reviewSectionId: 'VENDOR_PERSONNEL',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'position', label: 'Position' },
          { id: 'identityType.name', label: 'Identity Type' },
          { id: 'identityNumber', label: 'Identity Number' },
          { id: 'ownershipPercentage', label: 'Ownership Percentage' },
        ]
      }
    ]
  },
  {
    id: 'AUTHORIZED_SIGNER',
    title: 'Authorized Signers',
    endpoint: '/worklists/:workflowTransactionId?tab=personnel&personnelType=AUTHORIZED_SIGNER',
    isMultiple: true,
    reviewSectionId: 'VENDOR_PERSONNEL',
    sections: [
      {
        id: 'personnel-info',
        fields: [
          { id: 'name', label: 'Name' },
          { id: 'jobType.name', label: 'Job Type' },
          { id: 'position', label: 'Position' },
          { id: 'identityType.name', label: 'Identity Type' },
          { id: 'identityNumber', label: 'Identity Number' },
          { id: 'email', label: 'Email' },
          { id: 'privyId', label: 'Privy ID' },
          { id: 'enterpriseId', label: 'Enterprise ID' },
        ]
      }
    ]
  },
]
