import dayjs from 'dayjs'

import type { WorklistDataGroupSchema } from './types'

export const worklistUserAccessGroup: WorklistDataGroupSchema = {
  id: 'user-access',
  title: 'User Access',
  endpoint: '/worklists/:workflowTransactionId?tab=user-access',
  isMultiple: true,
  reviewSectionId: 'VENDOR_USER_ACCESS',
  card: {
    titleField: 'firstname',
    subtitleField: 'email',
  },
  sections: [
    {
      id: 'user-access-info',
      layout: 'grid',
      columns: 2,
      fields: [
        { id: 'firstname', label: 'First Name' },
        { id: 'lastname', label: 'Last Name' },

        // { id: 'username', label: 'username' },
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' },
        { id: 'area.name', label: 'Area' },
        { id: 'effectiveStartDate', label: 'Effective Start Date', render(value, originalValue) {
          return dayjs(value).format('DD MMM YYYY')
        }, },
        { id: 'effectiveEndDate', label: 'Effective End Date', render(value, originalValue) {
          return dayjs(value).format('DD MMM YYYY')
        } },
        { id: 'position.name', label: 'Position' },
        { id: 'jobTitle', label: 'Job Title' },
        { id : 'roles', label : 'Roles', component: 'tags' }

      ]
    }
  ]
}
