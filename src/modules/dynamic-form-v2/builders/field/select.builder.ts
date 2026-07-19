import type { FieldSchema, LookupSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const selectField = (
  options: Omit<FieldBuilderOptions, 'type' | 'lookup'> & { lookup: LookupSchema }
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.SELECT,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    lookup: options.lookup,
    component: options.component ?? (Component.SELECT as DynamicComponent),
  });
};
