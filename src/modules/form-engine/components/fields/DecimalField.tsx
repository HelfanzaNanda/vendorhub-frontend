import React from 'react';

import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';

import type { BaseFieldProps } from './types';

export const DecimalField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const precision = field.props?.precision || 2;
  const step = Math.pow(10, -precision);

  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type="number"
      value={value ?? ''}
      onChange={(e) => {
        const val = e.target.value === '' ? null : Number(e.target.value);

        onChange(val);
      }}
      onBlur={onBlur}
      label={field.label}
      placeholder={field.placeholder}
      helperText={error || field.helperText}
      error={!!error}
      required={field.validation?.required}
      disabled={isDisabled}
      fullWidth
      inputProps={{
        step,
      }}
      InputProps={{
        readOnly: isReadonly,
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress color="inherit" size={20} />
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};
