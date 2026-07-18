import React from 'react';

import type { BaseFieldProps } from './types';

export const HiddenField: React.FC<BaseFieldProps> = ({
  name,
  value,
  ref
}) => {
  return (
    <input 
      type="hidden" 
      name={name} 
      value={(value as string | number) ?? ''} 
      ref={ref as any} 
    />
  );
};
