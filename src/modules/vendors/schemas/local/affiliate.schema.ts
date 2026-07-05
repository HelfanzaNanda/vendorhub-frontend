import { z } from 'zod'

import type { FormSchema } from '../types'

export const affiliateModalSchema: FormSchema = {
  id: 'affiliate_modal',
  title: 'Company Affiliate Information',
  sections: [
    {
      id: 'affiliate_details',
      title: 'Affiliate Details',
      fields: [
        {
          id: 'affiliateTypeId',
          name: 'affiliateTypeId',
          label: 'Affiliate Type',
          type: 'select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'affiliate-types',
        },
        {
          id: 'companyBusinessEntityTypeId',
          name: 'companyBusinessEntityTypeId',
          label: 'Business Entity Type',
          type: 'select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'business-types',
        },
        {
          id: 'companyName',
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'npwp',
          name: 'npwp',
          label: 'NPWP',
          type: 'text',
          required: true,
          validation: z.string().min(15, 'NPWP is invalid'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'businessField',
          name: 'businessField',
          label: 'Business Field',
          type: 'text',
          required: true,
          grid: { xs: 12 }
        },
      ]
    }
  ]
}
