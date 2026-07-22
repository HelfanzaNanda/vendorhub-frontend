import React from 'react';

import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';

import type { BaseFieldProps } from './types';

export const NumberField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type="text"
      inputMode="numeric"
      value={value ?? ''}
      onKeyDown={(e) => {
        if (['e', 'E', '+', '-', ','].includes(e.key)) {
          e.preventDefault();
        }
      }}
      onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        onChange(Number(value));
      }}
      onBlur={onBlur}
      label={field.label}
      placeholder={field.placeholder}
      helperText={error || field.helperText}
      error={!!error}
      required={field.validation?.required}
      disabled={isDisabled}
      fullWidth
      InputProps={{
        readOnly: isReadonly,
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress color="inherit" size={20} />
          </InputAdornment>
        ) : undefined,
      }}
      slotProps={{
        htmlInput: {
            style: {
                MozAppearance: 'textfield'
            }
        }
      }}
      sx={{
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0
        }
      }}
    />
  );
};
