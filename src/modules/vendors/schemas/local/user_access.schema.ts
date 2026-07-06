import { z } from 'zod'

import type { FormSchema } from '../types'

export const userAccessModalSchema: FormSchema = {
  id: 'user_access_modal',
  title: 'User Access',
  sections: [
    {
      id: 'user_details',
      title: 'User Details',
      fields: [
        {
          id: 'firstname',
          name: 'firstname',
          label: 'First Name',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'lastname',
          name: 'lastname',
          label: 'Last Name',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'username',
          name: 'username',
          label: 'Username',
          type: 'text',
          required: true,
          validation: z.string().min(4, 'Username must be at least 4 characters'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          validation: z.string().email('Invalid email address'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'jobTitle',
          name: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'positionId',
          name: 'positionId',
          label: 'Position',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'positions',
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: 'phone',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'fileId',
          name: 'fileId',
          label: 'Profile Document',
          type: 'file',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'effectiveStartDate',
          name: 'effectiveStartDate',
          label: 'Effective Start Date',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'effectiveEndDate',
          name: 'effectiveEndDate',
          label: 'Effective End Date',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'roleIds',
          name: 'roleIds',
          label: 'Roles',
          type: 'checkbox-group',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'roles?type=external',
        },
        {
          id: 'areaIds',
          name: 'areaIds',
          label: 'Areas',
          type: 'checkbox-group',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'areas',
        },
      ]
    }
  ]
}
