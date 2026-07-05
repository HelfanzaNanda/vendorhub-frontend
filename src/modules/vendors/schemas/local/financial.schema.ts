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
          validation: z.string().min(1, 'Report type is required'),
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'report-types',
        },
        {
          id: 'year',
          name: 'year',
          label: 'Year',
          type: 'number',
          required: true,
          validation: z.number().min(1900, 'Invalid year'),
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'periodFrom',
          name: 'periodFrom',
          label: 'Period From',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'periodTo',
          name: 'periodTo',
          label: 'Period To',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'auditStatus',
          name: 'auditStatus',
          label: 'Audit Status',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'audit-statuses',
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
