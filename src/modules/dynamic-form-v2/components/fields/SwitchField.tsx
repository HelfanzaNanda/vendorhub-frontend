import React from 'react';

import { FormControl, FormControlLabel, Switch, FormHelperText, FormGroup } from '@mui/material';

import type { BaseFieldProps } from './types';

export const SwitchField: React.FC<BaseFieldProps> = ({
  name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled
}) => {
  return (
    <FormControl error={!!error} required={field.validation?.required} disabled={isDisabled}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
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
