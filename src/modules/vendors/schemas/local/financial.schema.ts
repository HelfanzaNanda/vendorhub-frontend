import { z } from 'zod'

import type { FormSchema } from '../types'

export const financialModalSchema: FormSchema = {
  id: 'financial_modal',
  title: 'Financial Report Information',
  sections: [
    {
      id: 'report_details',
      title: 'Report Details',
      fields: [
        {
          id: 'reportType',
          name: 'reportType',
          label: 'Report Type',
          type: 'select',
          required: true,
          grid: { xs: 12, md: 6 },
          options: [
            { value: 'INTERIM', label: 'INTERIM' },
            { value: 'ANNUAL', label: 'ANNUAL' }
          ]
        },
        {
          id: 'year',
          name: 'year',
          label: 'Year',
          type: 'select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'years',
          visibility: (values) => values?.reportType === 'ANNUAL'
        },
        {
          id: 'period',
          name: 'period',
          label: 'Period (Max 4 Years Backward)',
          type: 'date-range',
          required: true,
          grid: { xs: 12, md: 6 },
          visibility: (values) => values?.reportType === 'INTERIM',
          excludeFromPayload: true,
          validation: z.array(z.date()).optional().nullable().refine((dates) => {
            if (!dates || dates.length !== 2) return true; // Let required check handle empty cases
            const diffTime = Math.abs(dates[1].getTime() - dates[0].getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 366 // Allow up to 366 days for leap year
          }, { message: 'Total period duration cannot exceed 1 year' })
        },
        {
          id: 'auditStatus',
          name: 'auditStatus',
          label: 'Audit Status',
          type: 'select',
          grid: { xs: 12, md: 6 },
          options: [
            { value: 'UNAUDITED', label: 'UNAUDITED' },
            { value: 'AUDITED', label: 'AUDITED' }
          ]
        },
        {
          id: 'currencyId',
          name: 'currencyId',
          label: 'Currency',
          type: 'select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'currencies',
        },
        {
          id: 'fileId',
          name: 'fileId',
          label: 'Financial Report Document',
          type: 'file',
          grid: { xs: 12 }
        },
      ]
    },
    {
      id: 'financial_figures',
      title: 'Financial Figures',
      fields: [
        {
          id: 'currentAssets',
          name: 'currentAssets',
          label: 'Current Assets',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'totalAssets',
          name: 'totalAssets',
          label: 'Total Assets',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'currentLiabilities',
          name: 'currentLiabilities',
          label: 'Current Liabilities',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'totalLiabilities',
          name: 'totalLiabilities',
          label: 'Total Liabilities',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'totalRevenue',
          name: 'totalRevenue',
          label: 'Total Revenue',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'netProfitLossAfterTax',
          name: 'netProfitLossAfterTax',
          label: 'Net Profit/Loss After Tax',
          type: 'currency',
          grid: { xs: 12, md: 6 }
        },
      ]
    }
  ]
}
