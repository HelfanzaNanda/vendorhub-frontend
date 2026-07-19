import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { FieldType, type DynamicComponent } from '@/modules/dynamic-form-v2/enums';
import { CurrencyValidation } from '@/modules/dynamic-form-v2/validation';
import { createField } from '../base.builder';
import type { FieldBuilderOptions } from '../interfaces';
import { HalfGrid } from '../../grids';
import { Component } from '../../constants';

export const currencyField = (
  options: Omit<FieldBuilderOptions, 'type'>
): FieldSchema => {
  return createField({
    ...options,
    type: FieldType.CURRENCY,
    grid: options.grid ?? HalfGrid,
    validation: options.validation ?? CurrencyValidation,
    component: options.component ?? (Component.CURRENCY_INPUT as DynamicComponent),
  });
};
