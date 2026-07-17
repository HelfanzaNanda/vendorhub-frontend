import React from 'react';
import { BaseFieldProps } from './types';

export const HiddenField: React.FC<BaseFieldProps> = ({
  name,
  value,
  ref
}) => {
  return (
    <input 
      type="hidden" 
      name={name} 
      value={value ?? ''} 
      ref={ref} 
    />
  );
};
