import type { LookupSchema } from '@/modules/dynamic-form-v2';

export const AuditStatusLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            id: 'AUDIT',
            name: 'AUDIT'
        },
        {
            id: 'UNAUDIT',
            name: 'UNAUDIT'
        },
    ],
    labelField: 'name',
    valueField: 'id'
};
