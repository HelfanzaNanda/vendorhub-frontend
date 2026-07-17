import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { HalfGrid, EmailValidation, EmailVerification, Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

export const emailField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.EMAIL,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? EmailValidation,
    verification: options.verification ?? EmailVerification,
    component: options.component ?? (Component.EMAIL_VERIFICATION as DynamicComponent),
  });
};
