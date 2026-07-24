import type { TableConfigSchema } from '@/modules/form-engine/interfaces'
import { PersonnelType } from '../../vendor/common/constants/personnel.constant'
import { GroupCell } from '@/modules/form-engine/components/cells'
import React from 'react'

export const VendorBoardDirectorTable: TableConfigSchema = {
    endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.BOARD_OF_DIRECTORS}`, // :vendorTempId will be replaced by form context value
    columns: [
        {
            field: 'name',
            title: 'Person',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: `${record.title.name} ${record.name}`, variant: 'h6'  },
                        { value: record.position },
                        { value: record.email }
                    ]
                })
        },
        {
            field: 'identityNumber',
            title: 'Identity',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: record.identityType.name, variant: 'h6' },
                        { value: record.identityNumber }
                    ]
                })
        },
        {
            field: 'additonal',
            title: 'Email / Phone',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: record.email },
                        { value: record.phone }
                    ]
                })
        }
    ],
    sortable: true,
    searchable: true,
    pageSize: 5,
    pagination: true,
    selectable: true,
    actions: ['view', 'edit', 'delete']
}

export const VendorShareholderTable: TableConfigSchema = {
    endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.SHAREHOLDER}`,
    columns: [
        {
            field: 'name',
            title: 'Person',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: `${record.title.name} ${record.name}`, variant: 'h6'  },
                        { value: record.position },
                    ]
                })
        },
        {
            field: 'identityNumber',
            title: 'Identity',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: record.identityType ? record.identityType.name : 'NPWP', variant: 'h6' },
                        { value: record.identityNumber }
                    ]
                })
        },
        { field: 'ownershipPercentage', title: 'Ownership (%)' }
    ],
    sortable: true,
    searchable: true,
    pagination: true,
    selectable: true,
    pageSize: 5,
    actions: ['view', 'edit', 'delete']
}

export const VendorAuthorizedSignerTable: TableConfigSchema = {
    endpoint: `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.AUTHORIZED_SIGNER}`,
    columns: [
        {
            field: 'name',
            title: 'Person',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: `${record.title.name} ${record.name}`, variant: 'h6'  },
                        { value: record.position },
                    ]
                })
        },
        {
            field: 'identityNumber',
            title: 'Identity',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: record.identityType ? record.identityType.name : 'NPWP', variant: 'h6' },
                        { value: record.identityNumber }
                    ]
                })
        },
        {
            field: 'additonal',
            title: 'Email / Phone',
            render: ({ record }) =>
                React.createElement(GroupCell, {
                    items: [
                        { value: `${record.email} - ${record.privyId}` },
                        { value: record.phone }
                    ]
                })
        }
    ],
    sortable: true,
    searchable: true,
    pagination: true,
    selectable: true,
    pageSize: 5,
    actions: ['view', 'edit', 'delete']
}
