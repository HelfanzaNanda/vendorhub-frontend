import type { TableConfigSchema } from '@/modules/form-engine/interfaces';

export const VendorKbliTable: TableConfigSchema = {
  endpoint: `/vendor-industry-classification-temps`,
  columns: [
    { field: 'number', title: 'KBLI Number' },
    { field: 'title', title: 'Description' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
