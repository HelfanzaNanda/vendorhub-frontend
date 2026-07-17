import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { BaseFieldProps } from './types';

export const SelectField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const options = (field.props?.options as any[]) || [];

  return (
    <FormControl fullWidth error={!!error} required={field.validation?.required} disabled={isDisabled || loading}>
      <InputLabel id={`${name}-label`}>{field.label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value ?? ''}
        label={field.label}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        inputProps={{ readOnly: isReadonly }}
      >
        {options.map((opt: any) => (
          <MenuItem key={opt.value || opt.id} value={opt.value || opt.id}>
            {opt.label || opt.name}
          </MenuItem>
        ))}
      </Select>
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
