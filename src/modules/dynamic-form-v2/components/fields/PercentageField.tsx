import React from 'react';
import { TextField as MuiTextField, CircularProgress, InputAdornment } from '@mui/material';
import { BaseFieldProps } from './types';

export const PercentageField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    if (rawValue === '') {
      onChange(null);
      return;
    }
    
    let numValue = Number(rawValue);
    // restrict to 0-100 logic as per requirement
    if (numValue < 0) numValue = 0;
    if (numValue > 100) numValue = 100;
    
    onChange(numValue);
  };

  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type="number"
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
      inputProps={{ min: 0, max: 100 }}
      InputProps={{
        readOnly: isReadonly,
        endAdornment: (
          <InputAdornment position="end">
            {loading ? <CircularProgress color="inherit" size={20} /> : '%'}
          </InputAdornment>
        ),
      }}
    />
  );
};
