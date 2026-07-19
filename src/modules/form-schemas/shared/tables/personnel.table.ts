import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';
import { PersonnelType } from '../../vendor';

export const BoardDirectorTable: TableConfigSchema = {
  endpoint: `/vendor-personnel-temps?personnelType=${PersonnelType.BOARD_OF_DIRECTORS}`, // :vendorTempId will be replaced by form context value
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
  endpoint: `/vendor-personnel-temps?personnelType=${PersonnelType.SHAREHOLDER}`,
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
  endpoint: `/vendor-personnel-temps?personnelType=${PersonnelType.AUTHORIZED_SIGNER}`,
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
