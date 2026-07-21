import type { FieldSchema, LookupSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const autocompleteField = ( options: Omit<FieldBuilderOptions, 'type' | 'lookup'> & { lookup: LookupSchema } ): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.AUTOCOMPLETE,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    lookup: options.lookup,
    component: options.component ?? (Component.AUTOCOMPLETE as DynamicComponent),
    payload: options.payload,
    multiple: options.multiple ?? false,
  });
};
