import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const switchField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.SWITCH,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.SWITCH as DynamicComponent),
    defaultValue: options.defaultValue ?? false,
  });
};
