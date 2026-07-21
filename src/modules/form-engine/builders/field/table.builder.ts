import type { FieldSchema, TableConfigSchema, FormSchema } from '@/modules/form-engine/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/form-engine/enums';
import { OptionalValidation } from '@/modules/form-engine/validation';
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
