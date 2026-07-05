import { z } from 'zod'

import type { FormSchema } from '../types'

export const businessLicenseModalSchema: FormSchema = {
  id: 'business_license_modal',
  title: 'Business License',
  sections: [
    {
      id: 'license_details',
      title: 'License Details',
      fields: [
        {
          id: 'licenseName',
          name: 'licenseName',
          label: 'License Name',
          type: 'text',
          required: true,
          validation: z.string().min(1, 'License name is required'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'licenseNumber',
          name: 'licenseNumber',
          label: 'License Number',
          type: 'text',
          required: true,
          validation: z.string().min(1, 'License number is required'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'issueDate',
          name: 'issueDate',
          label: 'Issue Date',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'expiryDate',
          name: 'expiryDate',
          label: 'Expiry Date',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'fileId',
          name: 'fileId',
          label: 'License Document',
          type: 'file',
          grid: { xs: 12 }
        },
      ]
    }
  ]
}

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
          validation: z.string().min(1, 'Competency area is required'),
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
