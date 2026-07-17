import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { HalfGrid, OptionalValidation, Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

export const textField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.TEXT,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.DEFAULT as DynamicComponent),

  });
};
