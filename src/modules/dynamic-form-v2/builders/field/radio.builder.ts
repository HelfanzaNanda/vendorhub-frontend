import type { FieldSchema, LookupSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const radioField = (
  options: Omit<FieldBuilderOptions, 'type' | 'lookup'> & { lookup: LookupSchema }
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.RADIO,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    lookup: options.lookup,
    component: options.component ?? (Component.RADIO as DynamicComponent),
  });
};
