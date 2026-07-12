import { WorklistDataGroupSchema } from './types'

export const worklistUserAccessGroup: WorklistDataGroupSchema = {
  id: 'user-access',
  title: 'User Access',
  endpoint: '/worklists/:workflowTransactionId?tab=user-access',
  isMultiple: true,
  reviewSectionId: 'bank',
  card: {
    titleField: 'email',
    subtitleField: 'fullName',
  },
  sections: [
    {
      id: 'user-access-info',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'fullName', label: 'Full Name' },
        { id: 'email', label: 'Email' },
        { id: 'roles', label: 'Roles', component: 'tags' },
        { id: 'site.name', label: 'Site',  },
        { id: 'area.name', label: 'Area' },
        { id: 'department', label: 'Department' },
        { id: 'employeeId', label: 'Employee ID' },
      ]
    }
  ]
}
