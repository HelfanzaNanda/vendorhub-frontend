import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { FullGrid } from '../../grids';
import { Component } from '../../constants';

export const textareaField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.TEXTAREA,
    grid: options.grid ?? FullGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.DEFAULT as DynamicComponent),

    props: {
      rows: 4,
      ...options.props,
    },
  });
};
