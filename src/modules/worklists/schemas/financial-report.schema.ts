import type { WorklistDataGroupSchema } from './types'

export const worklistFinancialReportGroup: WorklistDataGroupSchema = {
  id: 'financial-report',
  title: 'Financial Report',
  endpoint: '/worklists/:workflowTransactionId?tab=financial-reports',
  isMultiple: true,
  reviewSectionId: 'VENDOR_FINANCIAL_REPORT',
  card: {
    titleField: 'year',
    subtitleField: 'reportType',
  },
  sections: [
    {
      id: 'financial-info',
      fields: [
        { id: 'year', label: 'Year' },
        { id: 'reportType', label: 'Report Type' },
        { id: 'currencyName', label: 'Currency' },
        { id: 'currentAssets', label: 'Cirremt Asset', formatter: 'currency' },
        { id: 'currentLiabilities', label: 'Cirremt Liabilities', formatter: 'currency' },
        { id: 'totalAssets', label: 'Total Asset', formatter: 'currency' },
        { id: 'totalLiabilities', label: 'Total Liability', formatter: 'currency' },
        { id: 'netProfitLossAfterTax', label: 'Net Profix Loss After tax', formatter: 'currency' },
        { id: 'totalRevenue', label: 'Total Revenue', formatter: 'currency' },
        { id: 'netProfit', label: 'Net Profit', formatter: 'currency' },
        { id: 'file.filename', label: 'Report Document', component: 'file' },
      ]
    }
  ]
}
