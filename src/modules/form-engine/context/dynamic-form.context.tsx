"use client"

import { createContext } from 'react';

import type { DynamicFormContextValue } from './dynamic-form-context.interface';

export const DynamicFormContext = createContext<DynamicFormContextValue | null>(null);
