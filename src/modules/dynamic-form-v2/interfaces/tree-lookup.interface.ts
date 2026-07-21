import { LookupOption, LookupType } from "./lookup.interface";

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
}
