import type { FieldSchema, LookupSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';
import { MultiLookupSchema } from '../../interfaces/multi-lookup.interface';

export const multiLookupField = ( options: Omit<FieldBuilderOptions, 'type' | 'multiLookup'> & { multiLookup: MultiLookupSchema } ): FieldSchema => {
    return createField({
        ...options,
        type: FieldType.MULTI_LOOKUP,
        grid: options.grid ?? HalfGrid,
        validation: options.validation ?? OptionalValidation,
        lookup: options.multiLookup.lookup,
        component: options.component ?? (Component.MULTI_LOOKUP as DynamicComponent),
        multiLookup: options.multiLookup,
        payload: options.payload,
    });
};
