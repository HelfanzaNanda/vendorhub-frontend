import type React from 'react';

import type { FieldSchema } from '../../interfaces';

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
}
