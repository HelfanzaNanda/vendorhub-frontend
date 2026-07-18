import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';

export const BoardDirectorTable: TableConfigSchema = {
  endpoint: '/vendor-personnel-temp/:vendorTempId/directors', // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'title', title: 'Title' },
    { field: 'fullName', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'identityNumber', title: 'Identity Number' }
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};

export const ShareholderTable: TableConfigSchema = {
  endpoint: '/vendor-personnel-temp/:vendorTempId/shareholders',
  columns: [
    { field: 'title', title: 'Title' },
    { field: 'fullName', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'identityNumber', title: 'Identity Number' }
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};

export const AuthorizedSignerTable: TableConfigSchema = {
  endpoint: '/vendor-personnel-temp/:vendorTempId/signers',
  columns: [
    { field: 'title', title: 'Title' },
    { field: 'fullName', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'identityNumber', title: 'Identity Number' }
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
