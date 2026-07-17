import { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { FullGrid, Component } from '@/modules/form-schemas/shared';
import { FieldBuilderOptions } from './interfaces';

export const createField = (options: FieldBuilderOptions): FieldSchema => {
  return {
    ...options,
    id: options.id,
    type: options.type,
    label: options.label,
    code: options.code || options.id,
    name: options.name || options.id,
    grid: options.grid || FullGrid,
    component: options.component || (Component.DEFAULT as DynamicComponent),
  };
};
