import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { Component } from '@/modules/form-schemas/shared';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';

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
