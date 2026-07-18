"use client"


import { useContext } from 'react';

import { DynamicFormContext } from './dynamic-form.context';
import type { DynamicFormContextValue } from './dynamic-form-context.interface';

/**
 * Hook to access the DynamicFormContext.
 * 
 * Must be used within a DynamicFormProvider.
 * Returns the centralized FormState and all engine methods.
 */
export const useDynamicFormContext = (): DynamicFormContextValue => {
  const context = useContext(DynamicFormContext);
  
  if (!context) {
    throw new Error('useDynamicFormContext must be used within DynamicFormProvider.');
  }
  
  return context;
};
