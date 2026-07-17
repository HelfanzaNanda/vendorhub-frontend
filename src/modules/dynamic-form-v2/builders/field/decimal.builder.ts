import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { HalfGrid, DecimalValidation, Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

export const decimalField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.DECIMAL,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? DecimalValidation,
    component: options.component ?? (Component.DEFAULT as DynamicComponent),
  });
};
