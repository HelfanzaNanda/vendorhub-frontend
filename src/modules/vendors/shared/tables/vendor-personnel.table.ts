import type { TableConfigSchema } from '@/modules/form-engine/interfaces';
import { PersonnelType } from '../../vendor';

export const VendorBoardDirectorTable: TableConfigSchema = {
  endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.BOARD_OF_DIRECTORS}`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'name', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'identityType.name', title: 'Identity Type' },
    { field: 'identityNumber', title: 'Identity Number' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
  ],
  sortable: true,
  searchable: true,
  pageSize: 5,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};

export const VendorShareholderTable: TableConfigSchema = {
  endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.SHAREHOLDER}`,
  columns: [
    { field: 'title.name', title: 'Title' },
    { field: 'name', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'identityType.name', title: 'Identity Type' },
    { field: 'identityNumber', title: 'Identity Number' },
    { field: 'ownershipPercentage', title: 'Ownership (%)' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  pageSize: 5,
  actions: ['view', 'edit', 'delete']
};

export const VendorAuthorizedSignerTable: TableConfigSchema = {
  endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.AUTHORIZED_SIGNER}`,
  columns: [
    { field: 'name', title: 'Full Name' },
    { field: 'position', title: 'Position' },
    { field: 'email', title: 'Email' },
    { field: 'identityType.name', title: 'Identity Type' },
    { field: 'identityNumber', title: 'Identity Number' }
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  pageSize: 5,
  actions: ['view', 'edit', 'delete']
};
