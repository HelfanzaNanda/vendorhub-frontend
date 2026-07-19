import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';

export const VendorFinancialReportTable: TableConfigSchema = {
  endpoint: `/vendor-financial-report-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'year', title: 'Year' },
    { field: 'periode', title: 'Periode' },
    { field: 'auditType', title: 'Audit Type' },
    { field: 'currency.name', title: 'Currency' },
    { field: 'file.fileName', title: 'Filename' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
