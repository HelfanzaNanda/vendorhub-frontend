import { z } from 'zod'

import type { FormSchema } from '../types'

export const bankModalSchema: FormSchema = {
  id: 'bank_modal',
  title: 'Bank Account Information',
  sections: [
    {
      id: 'bank_details',
      title: 'Account Details',
      fields: [
        {
          id: 'bankBranchId',
          name: 'bankBranchId',
          label: 'Bank Branch',
          type: 'select',
          required: true,
          validation: z.string().min(1, 'Bank branch is required'),
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'bank-branches',
        },
        {
          id: 'currencyId',
          name: 'currencyId',
          label: 'Currency',
          type: 'select',
          required: true,
          validation: z.string().min(1, 'Currency is required'),
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'currencies',
        },
        {
          id: 'accountName',
          name: 'accountName',
          label: 'Account Name',
          type: 'text',
          required: true,
          validation: z.string().min(1, 'Account name is required'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'accountNumber',
          name: 'accountNumber',
          label: 'Account Number',
          type: 'text',
          required: true,
          validation: z.string().min(5, 'Account number is invalid'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'fileId',
          name: 'fileId',
          label: 'Bank Statement / Passbook Document',
          type: 'file',
          grid: { xs: 12 }
        },
      ]
    }
  ]
}
