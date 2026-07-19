import React from 'react';

import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';

import type { BaseFieldProps } from './types';

export const CurrencyField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const formatCurrency = (val: unknown) => {
    if (val === null || val === undefined || val === '') return '';
    const numericStr = String(val).replace(/[^0-9]/g, '');

    if (!numericStr) return '';

    // Format using thousand separator
    return Number(numericStr).toLocaleString('id-ID'); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = rawValue === '' ? null : Number(rawValue);

    onChange(numValue);
  };

  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type="text"
      value={formatCurrency(value)}
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
        // startAdornment: <InputAdornment position="start">{(field.props?.currency as string) || 'Rp'}</InputAdornment>,
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress color="inherit" size={20} />
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};
