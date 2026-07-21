import type { HttpMethod } from '../enums/http-method.enum';

export interface LookupOption {
    id: string | number | boolean;
    name: string;
    disabled?: boolean;
    children?: LookupOption[];
    [key: string]: unknown;
}

export interface LookupSchema {
    type?: LookupType;
    endpoint?: string;
    method?: HttpMethod;
    valueField: string;
    labelField: string;
    params?: Record<string, unknown>;
    searchParam?: string;
    debounce?: number;
    cache?: boolean;
    preload?: boolean;
    options?: LookupOption[];

    tree?: boolean;
    childrenField?: string;
    selectableField?: string;

}


export type LookupType = 'API' | 'STATIC' | 'TREE';
