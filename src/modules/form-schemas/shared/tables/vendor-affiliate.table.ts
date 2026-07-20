import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';

export const VendorAffiliateTable: TableConfigSchema = {
  endpoint: `/vendor-affiliation-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'companyBusinessEntityType.name', title: 'Business Entity' },
    { field: 'companyName', title: 'Company Name' },
    { field: 'npwp', title: 'NPWP' },
    { field: 'affiliateType.name', title: 'Affiliate Type' },
    { field: 'businessField', title: 'Business Field' },
    { field: 'address', title: 'Address' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
