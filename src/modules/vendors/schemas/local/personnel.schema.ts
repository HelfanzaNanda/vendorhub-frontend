import { z } from 'zod'

import type { FormSchema } from '../types'

export const personnelModalSchema: FormSchema = {
  id: 'personnel_modal',
  title: 'Personnel Information',
  sections: [
    {
      id: 'personnel_details',
      title: 'Details',
      fields: [
        {
          id: 'titleId',
          name: 'titleId',
          label: 'Title',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'titles',
        },
        {
          id: 'name',
          name: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          validation: z.string().min(1, 'Name is required'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'jobTypeId',
          name: 'jobTypeId',
          label: 'Job Type',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'job-types',
        },
        {
          id: 'position',
          name: 'position',
          label: 'Position',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'identityTypeId',
          name: 'identityTypeId',
          label: 'Identity Type',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'identity-types',
        },
        {
          id: 'identityNumber',
          name: 'identityNumber',
          label: 'Identity Number',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          validation: z.string().email('Invalid email address'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: 'phone',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'ownershipPercentage',
          name: 'ownershipPercentage',
          label: 'Ownership Percentage (%)',
          type: 'number',
          grid: { xs: 12, md: 6 },
          visibility: (values) => values.personnelTypeCode === 'SHAREHOLDER'
        },
        {
          id: 'privyId',
          name: 'privyId',
          label: 'Privy ID',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'enterpriseId',
          name: 'enterpriseId',
          label: 'Enterprise ID',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
      ]
    }
  ]
}
