import { WorklistDataGroupSchema } from './types'

export const worklistFinancialReportGroup: WorklistDataGroupSchema = {
  id: 'financial-report',
  title: 'Financial Report',
  endpoint: '/worklists/:workflowTransactionId?tab=financial-reports',
  isMultiple: true,
  reviewSectionId: 'financial-report',
  sections: [
    {
      id: 'financial-info',
      fields: [
        { id: 'year', label: 'Year' },
        { id: 'reportType', label: 'Report Type' },
        { id: 'currency', label: 'Currency' },
        { id: 'asset', label: 'Total Asset', type: 'currency' },
        { id: 'liability', label: 'Total Liability', type: 'currency' },
        { id: 'equity', label: 'Total Equity', type: 'currency' },
        { id: 'revenue', label: 'Total Revenue', type: 'currency' },
        { id: 'netProfit', label: 'Net Profit', type: 'currency' },
        { id: 'file', label: 'Report Document', type: 'file' },
      ]
    }
  ]
}
