import type { TableConfigSchema } from '@/modules/form-engine/interfaces';

export const VendorUserAccessTable: TableConfigSchema = {
  endpoint: `/vendor-user-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    { field: 'username', title: 'Username' },
    { field: 'firstname', title: 'First Name' },
    { field: 'lastname', title: 'Last Name' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'jobTitle', title: 'job Title' },
    { field: 'roles', title: 'roles', render: (render: any) => {
        const values = render.getValue();
        if (values) {
            return values.join(', ');
        }
        return '-';
    } },
    { field: 'effectiveEndDate', title: 'Effective End Date' },
    { field: 'areas', title: 'Area', render: (render: any) => {
        const values = render.getValue();
        if (values) {
            return values.join(', ');
        }
        return '-';
    } },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
