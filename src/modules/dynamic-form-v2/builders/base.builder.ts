import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import type { DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { FullGrid, Component } from '@/modules/form-schemas/shared';
import type { FieldBuilderOptions } from './interfaces';

export const createField = (options: FieldBuilderOptions): FieldSchema => {
  return {
    ...options,
    label: options.label,
     id: options.name,
    code: options.code ?? options.name,
    name: options.name,
    grid: options.grid || FullGrid,
    component: options.component || (Component.DEFAULT as DynamicComponent),
  };
};
