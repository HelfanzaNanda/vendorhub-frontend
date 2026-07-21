import React from 'react';

import { FormControl, FormControlLabel, Checkbox, FormHelperText, FormGroup } from '@mui/material';

import type { BaseFieldProps } from './types';

export const CheckboxField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled
}) => {
  return (
    <FormControl error={!!error} required={field.validation?.required} disabled={isDisabled}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              inputRef={ref}
              readOnly={isReadonly}
            />
          }
          label={field.label}
        />
      </FormGroup>
      {(error || field.helperText) && <FormHelperText>{error || field.helperText}</FormHelperText>}
    </FormControl>
  );
};
