import type { TableConfigSchema } from '@/modules/form-engine/interfaces';
import { VendorFinancialPeriodCell } from '../components/cells/FinancialPeriodCell';

export const VendorFinancialReportTable: TableConfigSchema = {
  endpoint: `/vendor-financial-report-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    // { field: 'year.name', title: 'Year' },
    { field: 'reportType.name', title: 'reportType', renderComponent : VendorFinancialPeriodCell},
    { field: 'auditStatus.name', title: 'Audit Status' },
    { field: 'currency.name', title: 'Currency' },
    { field: 'file.filename', title: 'File' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
