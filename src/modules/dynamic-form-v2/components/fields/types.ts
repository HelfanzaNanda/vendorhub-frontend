import React from 'react';
import { FieldSchema } from '../../interfaces';

export interface BaseFieldProps {
  name: string;
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  ref?: React.Ref<any>;
  field: FieldSchema;
  error?: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
}
