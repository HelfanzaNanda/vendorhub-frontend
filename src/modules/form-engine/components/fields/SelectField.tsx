import React from 'react';

import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import type { BaseFieldProps } from './types';
import type { OptionSchema } from '../../interfaces';

export const SelectField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled, loading
}) => {
  const options = (field.props?.options as OptionSchema[]) || [];

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
        {options.map((opt: OptionSchema) => (
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
