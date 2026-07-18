import React from 'react';

import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';

import type { BaseFieldProps } from './types';

export const TextAreaField: React.FC<BaseFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  ref,
  field,
  error,
  isReadonly,
  isDisabled,
  loading
}) => {
  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      value={value ?? ''}
      onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      onBlur={onBlur}
      label={field.label}
      placeholder={field.placeholder}
      helperText={error || field.helperText}
      error={!!error}
      required={field.validation?.required}
      disabled={isDisabled}
      fullWidth
      multiline
      minRows={3}
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
