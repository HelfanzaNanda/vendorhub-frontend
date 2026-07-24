import type { LookupSchema } from '@/modules/form-engine';

export const AuditStatusLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            id: 'AUDITED',
            name: 'AUDITED'
        },
        {
            id: 'UNAUDITED',
            name: 'UNAUDITED'
        },
    ],
    labelField: 'name',
    valueField: 'id'
};
