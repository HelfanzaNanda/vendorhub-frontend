import { z } from 'zod'

import type { FormSchema } from '../types'

export const competencyModalSchema: FormSchema = {
  id: 'competency_modal',
  title: 'Company Competency',
  sections: [
    {
      id: 'competency_details',
      title: 'Competency Details',
      fields: [
        {
          id: 'competencyName',
          name: 'competencyName',
          label: 'Competency Area',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'certificateId',
          name: 'certificateId',
          label: 'Certificate Number',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'description',
          name: 'description',
          label: 'Description',
          type: 'textarea',
          grid: { xs: 12 }
        },
        {
          id: 'fileId',
          name: 'fileId',
          label: 'Competency Document',
          type: 'file',
          grid: { xs: 12 }
        },
      ]
    }
  ]
}

export const capabilityFormSchema: FormSchema = {
  id: 'vendor_capability_form',
  title: 'Business License',
  description: 'Upload your NIB document and define your industry classifications.',
  sections: [
    {
      id: 'license_details',
      title: 'License Details',
      fields: [
        {
          id: 'nibFileId',
          name: 'nibFileId',
          label: 'NIB Document',
          type: 'file',
          required: true,
          grid: { xs: 12 }
        }
      ]
    },
    {
      id: 'industry_classifications_section',
      title: 'Industry Classifications',
      fields: [
        {
          id: 'industryClassifications',
          name: 'industryClassifications',
          label: 'Industry Classifications',
          type: 'field-array',
          required: true,
          arrayItemLabel: 'Industry Classification',
          validation: z.array(z.object({
            industryClassificationId: z.union([z.number(), z.string()]).nullable().refine((val) => val !== null && val !== undefined && val !== '', 'Industry Classification is required'),
            number: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }))
          .min(1, 'At least one Industry Classification is required')
          .refine((items) => {
            const ids = items.map(item => item.industryClassificationId).filter(Boolean);
            return new Set(ids).size === ids.length;
          }, { message: 'Duplicate Industry Classifications are not allowed' }),
          arrayFields: [
            {
              id: 'industryClassificationId',
              name: 'industryClassificationId',
              label: 'Industry Classification Lookup',
              type: 'autocomplete',
              lookupEndpoint: 'industry-classifications',
              populateFields: {
                label: 'number',
                name: 'title',
                description: 'description'
              },
              required: true,
              grid: { xs: 12 }
            },
            {
              id: 'number',
              name: 'number',
              label: 'Number',
              type: 'display',
              grid: { xs: 12, md: 4 }
            },
            {
              id: 'title',
              name: 'title',
              label: 'Title',
              type: 'display',
              grid: { xs: 12, md: 8 }
            },
            {
              id: 'description',
              name: 'description',
              label: 'Description',
              type: 'display',
              grid: { xs: 12 }
            }
          ]
        }
      ]
    }
  ]
}
