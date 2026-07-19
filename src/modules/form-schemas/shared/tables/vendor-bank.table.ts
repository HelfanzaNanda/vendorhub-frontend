import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';

export const VendorBankTable: TableConfigSchema = {
  endpoint: `/vendor-bank-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'accountName', title: 'Account Name' },
    { field: 'accountNumber', title: 'Account Number' },
    { field: 'currency.name', title: 'Currency' },
    { field: 'bankBranch.name', title: 'Bank Branch' },
    { field: 'bankBranch.bank.name', title: 'Bank Name' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
