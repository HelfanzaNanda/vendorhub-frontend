import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const dateField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.DATE,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.DATE_PICKER as DynamicComponent),
  });
};
