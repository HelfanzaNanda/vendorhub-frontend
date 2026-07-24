import { GroupCell } from '@/modules/form-engine/components/cells';
import type { TableConfigSchema } from '@/modules/form-engine/interfaces';
import React from 'react';

export const VendorBankTable: TableConfigSchema = {
  endpoint: `/vendor-bank-temps`, // :vendorTempId will be replaced by form context value
  columns: [
    {
        field: 'account',
        title: 'Account',
        render: ({ record }) =>
            React.createElement(GroupCell, {
                items: [
                    { value: record.accountName, variant: 'h6' },
                    { value: record.accountNumber },
                ]
            })
    },
    {
        field: 'bank',
        title: 'Bank',
        render: ({ record }) =>
            React.createElement(GroupCell, {
                items: [
                    { value: record.bankBranch.bank.country.name, variant: 'h6' },
                    { value: record.bankBranch.bank.name },
                    { value: record.bankBranch.name },
                ]
            })
    },
    { field: 'currency.name', title: 'Currency' },
    { field: 'file.originalFilename', title: 'File' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
