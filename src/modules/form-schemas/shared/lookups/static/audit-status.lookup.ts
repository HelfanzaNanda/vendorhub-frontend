import type { LookupSchema } from '@/modules/form-engine';

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
