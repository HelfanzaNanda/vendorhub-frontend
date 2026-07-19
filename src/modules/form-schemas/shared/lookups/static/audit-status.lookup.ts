import type { LookupSchema } from '@/modules/dynamic-form-v2';

export const AuditStatusLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            value: 'AUDIT',
            label: 'AUDIT'
        },
        {
            value: 'UNAUDIT',
            label: 'UNAUDIT'
        },
    ],
    labelField: 'label',
    valueField: 'value'
};
