import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { Component } from '../../constants';

export const hiddenField = (
  options: Omit<FieldBuilderOptions, 'type' | 'grid'>
): FieldSchema => {
  const field = createField({
    ...options,
    type: FieldType.HIDDEN,
    component: options.component ?? (Component.DEFAULT as DynamicComponent),

  });
  
  delete field.grid;
  
  return field;
};
