"use client"


import { useContext } from 'react';

import { DynamicFormContext } from './dynamic-form.context';
import type { DynamicFormContextValue } from './dynamic-form-context.interface';

export const useDynamicFormContext = (): DynamicFormContextValue => {
  const context = useContext(DynamicFormContext);
  
  if (!context) {
    throw new Error('DynamicFormContext is not available. Ensure that your component is wrapped inside <DynamicFormProvider>.');
  }
  
  return context;
};
