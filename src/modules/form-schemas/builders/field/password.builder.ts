import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { HalfGrid, PasswordValidation, Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

export const passwordField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.PASSWORD,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? PasswordValidation,
    component: options.component ?? (Component.DEFAULT as DynamicComponent),
  });
};
