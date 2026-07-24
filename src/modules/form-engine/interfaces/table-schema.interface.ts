import { ComponentType } from "react";

export interface TableColumnSchema {
    field: string;
    title: string;
    render?: (props: TableCellComponentProps) => React.ReactNode;
    renderComponent?: ComponentType<TableCellComponentProps>;
    // renderComponent?: (
    //     props: TableCellComponentProps
    // ) => React.ReactNode;
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
    pageSize?: number;
    actions?: ('view' | 'edit' | 'delete')[];
}


export interface TableCellComponentProps<T = any> {
    value: any;
    record: T;
}
