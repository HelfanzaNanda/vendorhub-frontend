import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { BaseFieldProps } from './types';

export const DateField: React.FC<BaseFieldProps> = ({
  name, value, onChange, ref, field, error, isReadonly, isDisabled
}) => {
  return (
    <DatePicker
      label={field.label}
      value={value ?? null}
      onChange={onChange}
      readOnly={isReadonly}
      disabled={isDisabled}
      minDate={field.props?.minDate}
      maxDate={field.props?.maxDate}
      inputRef={ref}
      slotProps={{
        textField: {
          name,
          fullWidth: true,
          error: !!error,
          helperText: error || field.helperText,
          required: field.validation?.required,
          placeholder: field.placeholder,
        }
      }}
    />
  );
};
