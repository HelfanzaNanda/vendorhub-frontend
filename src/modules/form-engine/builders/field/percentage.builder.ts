import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { PercentageValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const percentageField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.PERCENTAGE,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? PercentageValidation,
    component: options.component ?? (Component.PERCENTAGE_INPUT as DynamicComponent),
  });
};
