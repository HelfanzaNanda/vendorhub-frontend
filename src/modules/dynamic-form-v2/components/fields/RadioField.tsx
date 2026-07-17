import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormHelperText, FormLabel } from '@mui/material';
import { BaseFieldProps } from './types';

export const RadioField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled
}) => {
  const options = (field.props?.options as any[]) || [];

  return (
    <FormControl error={!!error} required={field.validation?.required} disabled={isDisabled}>
      {field.label && <FormLabel id={`${name}-radio-label`}>{field.label}</FormLabel>}
      <RadioGroup
        row={field.props?.row !== false}
        aria-labelledby={`${name}-radio-label`}
        name={name}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      >
        {options.map((opt: any) => (
          <FormControlLabel
            key={opt.value || opt.id}
            value={opt.value || opt.id}
            control={<Radio inputRef={ref} readOnly={isReadonly} />}
            label={opt.label || opt.name}
          />
        ))}
      </RadioGroup>
      {(error || field.helperText) && <FormHelperText>{error || field.helperText}</FormHelperText>}
    </FormControl>
  );
};
