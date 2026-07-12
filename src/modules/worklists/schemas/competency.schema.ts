import { WorklistDataGroupSchema } from './types'

export const worklistCompetencyGroup: WorklistDataGroupSchema = {
  id: 'competency',
  title: 'Competency',
  endpoint: '/worklists/:workflowTransactionId?tab=competencies',
  isMultiple: true,
  reviewSectionId: 'competency',
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
