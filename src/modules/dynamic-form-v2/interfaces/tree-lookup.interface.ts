import { LookupOption, LookupType } from "./lookup.interface";

export interface TreeMappingSchema {
    from: string;
    to: string;
}

export interface TreeLookupSchema {
    type?: LookupType;
    endpoint: string;
    method?: 'GET' | 'POST';
    valueField?: string;
    labelField?: string;
    childrenField?: string;
    searchParam?: string;
    debounce?: number;
    cache?: boolean;
    preload?: boolean;
    options?: LookupOption[];
    params?: Record<string, unknown>;
    mapping?: TreeMappingSchema[];
    searchable?: boolean;
    duplicate?: boolean;
}
