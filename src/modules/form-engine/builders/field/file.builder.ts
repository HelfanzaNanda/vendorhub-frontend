import type { FieldSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { FullGrid } from '../../grids';
import { Component } from '../../constants';

export const fileField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.FILE,
    grid: options.grid ?? FullGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.DOCUMENT_UPLOAD as DynamicComponent),
  });
};
