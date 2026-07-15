import { WorklistDataGroupSchema } from './types'

export const worklistCompetencyGroup: WorklistDataGroupSchema = {
  id: 'competency',
  title: 'Competency',
  endpoint: '/worklists/:workflowTransactionId?tab=competencies',
  isMultiple: true,
  reviewSectionId: 'VENDOR_COMPETENCY',
  card: {
    titleField: 'subCategoryItem.name',
    subtitleField: 'subCategoryItem.code'
  },
  sections: [
    {
      id: 'competency-info',
      fields: [
        { id: 'subCategoryItem.competencySubCategory.competencyCategory.name', label: 'Category' },
        { id: 'subCategoryItem.competencySubCategory.name', label: 'Sub Category' },
        { id: 'subCategoryItem.name', label: 'Sub Category Item' },
      ]
    }
  ],
  childRecords: {
    dataField: 'customerReferences',
    group: {
      id: 'customer-reference',
      title: 'Customer References',
      endpoint: '',
      isMultiple: true,
      reviewSectionId: '',
      card: {
        titleField: 'name',
      },
      sections: [
        {
          id: 'customer-reference-info',
          fields: [
            { id: 'name', label: 'Project Name' },
            { id: 'description', label: 'Description' },
            { id: 'projectValue', label: 'Project Value' },
            { id: 'year', label: 'Year' },
            { id: 'areaIds', label: 'Area' },
            { id: 'fileName', label: 'Attachment', component: 'file' }
          ]
        }
      ]
    }
  }
}
