import type { LookupSchema } from '@/modules/form-engine';

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
    valueField: 'id'
};
