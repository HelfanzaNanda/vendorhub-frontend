import { z } from 'zod'
import type { FormSchema } from '../types'

export const termsSchema: FormSchema = {
  id: 'vendor_terms',
  title: 'Vendor Information',
  description: 'Please provide the details of the authorized signatory representing your company.',
  sections: [
    {
      id: 'signatory_details',
      title: 'Signatory Details',
      fields: [
        {
          id: 'vendorName',
          name: 'vendorName',
          label: 'Vendor Name',
          type: 'text',
          readonly: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'authorizedSignatory',
          name: 'authorizedSignatory',
          label: 'Authorized Signatory',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'position',
          name: 'position',
          label: 'Position',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'supportingDocument',
          name: 'supportingDocumentId',
          label: 'Supporting Document',
          type: 'file',
          required: true,
          grid: { xs: 12, md: 6 }
        },
      ]
    }
  ]
}
