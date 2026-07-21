import type { FieldSchema } from '@/modules/form-engine/interfaces';
import type { DynamicComponent } from '@/modules/form-engine/enums';
import type { FieldBuilderOptions } from './interfaces';
import { FullGrid } from '../grids';
import { Component } from '../constants';

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
