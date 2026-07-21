import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { PhoneValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const phoneField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.PHONE,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? PhoneValidation,
    // verification: options.verification ?? PhoneVerification,
    component: options.component ?? (Component.PHONE_VERIFICATION as DynamicComponent),
  });
};
