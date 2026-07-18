export interface TableColumnSchema {
    field: string;
    title: string;
    render?: any;
    sortable?: boolean;
}

export interface TableConfigSchema {
    endpoint: string;
    columns: (string | TableColumnSchema)[];
    sortable?: boolean;
    searchable?: boolean;
    pagination?: boolean;
    exportable?: boolean;
    selectable?: boolean;
    actions?: ('view' | 'edit' | 'delete')[];
}
