import { GroupCell } from '@/modules/form-engine/components/cells';
import type { TableConfigSchema } from '@/modules/form-engine/interfaces';
import React from 'react';

export const VendorUserAccessTable: TableConfigSchema = {
  endpoint: `/vendor-user-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    {
        field: 'person',
        title: 'Person',
        render: ({ record }) =>
            React.createElement(GroupCell, {
                items: [
                    { value: `${record.firstname} - ${record.lastname}`, variant: 'h6' },
                    { value: record.email },
                    { value: record.phone },
                    { value: record.username }
                ]
            })
    },
    {
        field: 'area',
        title: 'Area',
        render: ({ record }) =>
            React.createElement(GroupCell, {
                items: [
                    { value: record.position?.name, variant: 'h6' },
                    { value: record.areas?.join(', ') },
                    { value: `Valid until : ${record.effectiveEndDate}` },
                ]
            })
    },
    { field: 'roles', title: 'roles', render: ({value, record}) => {
        if (value) {
            return value.join(', ');
        }
        return '-';
    } }
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
