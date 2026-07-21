import type React from 'react';

import type { FieldSchema } from '../../interfaces';
import { DynamicFormContextValue } from '../../context';

export interface BaseFieldProps {
  name: string;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  ref?: React.Ref<any>;
  field: FieldSchema;
  error?: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
  context: DynamicFormContextValue
}
