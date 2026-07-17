import React from 'react';
import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';
import { BaseFieldProps } from './types';

export const PhoneField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // purely numeric and plus sign mapping
    const rawValue = e.target.value.replace(/[^0-9+]/g, '');
    onChange(rawValue);
  };

  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type="tel"
      value={value ?? ''}
      onChange={handleChange}
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
    />
  );
};
