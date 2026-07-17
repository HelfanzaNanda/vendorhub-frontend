import React, { useState } from 'react';
import { TextField as MuiTextField, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // standard MUI icons
import { BaseFieldProps } from './types';

export const PasswordField: React.FC<BaseFieldProps> = ({
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <MuiTextField
      inputRef={ref}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value ?? ''}
      onChange={onChange}
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
        endAdornment: (
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                disabled={isDisabled}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
