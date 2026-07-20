import type { LookupSchema } from '@/modules/dynamic-form-v2';

export const ReportTypeLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            id: 'ANNUAL',
            name: 'ANNUAL'
        },
        {
            id: 'INTERIM',
            name: 'INTERIM'
        }
    ],
    labelField: 'name',
    valueField: 'value'
};
