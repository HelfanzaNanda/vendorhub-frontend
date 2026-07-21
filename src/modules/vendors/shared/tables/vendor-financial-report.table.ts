import type { TableConfigSchema } from '@/modules/form-engine/interfaces';

export const VendorFinancialReportTable: TableConfigSchema = {
  endpoint: `/vendor-financial-report-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'year', title: 'Year' },
    { field: 'reportType', title: 'reportType' },
    { field: 'auditStatus', title: 'Audit Status' },
    { field: 'currency.name', title: 'Currency' },
    { field: 'file.filename', title: 'File' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
