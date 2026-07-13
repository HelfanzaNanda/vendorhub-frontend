import { WorklistDataGroupSchema } from './types'

export const worklistCompetencyGroup: WorklistDataGroupSchema = {
  id: 'competency',
  title: 'Competency',
  endpoint: '/worklists/:workflowTransactionId?tab=competencies',
  isMultiple: true,
  reviewSectionId: 'VENDOR_COMPETENCY',
  sections: [
    {
      id: 'competency-info',
      fields: [
        { id: 'competency.name', label: 'Competency' },
        { id: 'description', label: 'Description' },
      ]
    }
  ]
}
