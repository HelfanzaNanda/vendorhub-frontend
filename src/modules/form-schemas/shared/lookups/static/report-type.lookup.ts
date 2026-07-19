import type { LookupSchema } from '@/modules/dynamic-form-v2';

export const ReportTypeLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            value: 'ANNUAL',
            label: 'ANNUAL'
        },
        {
            value: 'INTERIM',
            label: 'INTERIM'
        }
    ],
    labelField: 'label',
    valueField: 'value'
};
