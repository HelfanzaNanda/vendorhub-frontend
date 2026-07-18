"use client"

import React, { useMemo } from 'react';

import { DynamicFormContext } from './dynamic-form.context';
import type { DynamicFormContextValue } from './dynamic-form-context.interface';

export interface DynamicFormProviderProps {
  contextValue: DynamicFormContextValue;
  children: React.ReactNode;
}

export const DynamicFormProvider: React.FC<DynamicFormProviderProps> = ({ contextValue, children }) => {
  const value = useMemo(() => contextValue, [contextValue]);

  return (
    <DynamicFormContext.Provider value={value}>
      {children}
    </DynamicFormContext.Provider>
  );
};
