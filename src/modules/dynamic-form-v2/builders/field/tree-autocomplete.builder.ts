import type { FieldSchema, LookupSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';


export const treeAutocompleteField = (
    options: Omit<FieldBuilderOptions, 'type' | 'lookup'> & {
        lookup: LookupSchema;
    }
): FieldSchema => {

    return createField({
        ...options,
        type: FieldType.TREE_AUTOCOMPLETE,
        component: options.component ?? (Component.TREE_AUTOCOMPLETE as DynamicComponent),
        grid: options.grid ?? HalfGrid,
        validation: options.validation ?? OptionalValidation,
        lookup: {
            ...options.lookup,
            tree: true
        },
        payload: options.payload,
        multiple: options.multiple ?? false
    });

};
