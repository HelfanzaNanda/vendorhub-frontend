import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { EmailValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const emailField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.EMAIL,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? EmailValidation,
    component: options.component ?? (Component.EMAIL_VERIFICATION as DynamicComponent),
  });
};
