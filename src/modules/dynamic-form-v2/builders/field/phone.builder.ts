import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { PhoneValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';
// import { PhoneVerification } from '@/modules/form-schemas';

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
