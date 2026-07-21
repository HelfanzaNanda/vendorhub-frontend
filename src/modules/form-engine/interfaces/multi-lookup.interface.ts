import type { LookupSchema } from './lookup.interface';

export interface MultiLookupColumn {
    field: string;
    header: string;
    width?: number;
}

export interface MultiLookupSchema {
    lookup: LookupSchema;
    columns: MultiLookupColumn[];
    duplicate?: boolean;
    removable?: boolean;
    searchable?: boolean;
}
