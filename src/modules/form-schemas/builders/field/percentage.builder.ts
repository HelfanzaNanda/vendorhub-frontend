import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { HalfGrid, PercentageValidation, Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

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
