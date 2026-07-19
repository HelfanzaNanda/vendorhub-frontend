import type { FieldSchema, NestedFormSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { FullGrid } from '../../grids';
import { Component } from '../../constants';

export const formField = (
  options: Omit<FieldBuilderOptions, 'type' | 'nested'> & { nested: NestedFormSchema }
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.FORM,
    grid: options.grid ?? FullGrid,
    validation: options.validation ?? OptionalValidation,
    nested: options.nested,
    component: options.component ?? (Component.FORM as DynamicComponent),
  });
};
