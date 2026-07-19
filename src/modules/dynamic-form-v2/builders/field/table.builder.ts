import type { FieldSchema, TableConfigSchema, FormSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { OptionalValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { FullGrid } from '../../grids';
import { Component } from '../../constants';

export const tableField = (
  options: Omit<FieldBuilderOptions, 'type'> & { table: TableConfigSchema; schema: FormSchema }
): FieldSchema => {
  const base = createField({
    ...options,
    type: FieldType.TABLE,
    grid: options.grid ?? FullGrid,
    validation: options.validation ?? OptionalValidation,
    component: options.component ?? (Component.TABLE as DynamicComponent),
  });

  return {
    ...base,
    table: options.table,
    schema: options.schema,
  };
};
