'use client'

import React, { forwardRef } from 'react'

import type { DateTimePickerProps } from 'react-flatpickr';
import Flatpickr from 'react-flatpickr'
import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material'
import 'flatpickr/dist/flatpickr.css'

export interface AppReactDatepickerProps extends Omit<DateTimePickerProps, 'render'> {
  label?: string
  error?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
  placeholder?: string
  required?: boolean
  disabled?: boolean
  InputProps?: any
}

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { inputRef, ...rest } = props

  
return <TextField {...rest} inputRef={ref || inputRef} />
})

CustomInput.displayName = 'CustomInput'

export const AppReactDatepicker = forwardRef<any, AppReactDatepickerProps>((props, ref) => {
  const { label, error, helperText, fullWidth, placeholder, required, disabled, InputProps, ...rest } = props
  
  return (
    <Flatpickr
      {...rest}
      options={rest.options || {}}
      ref={ref}
      render={({ defaultValue, value, render: _render, options: _options, ...flatProps }, customRef) => {
        return (
          <CustomInput
            {...flatProps}
            inputRef={customRef}
            label={label}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            InputProps={InputProps}
            InputLabelProps={{ shrink: true }}
          />
        )
      }}
    />
  )
})
AppReactDatepicker.displayName = 'AppReactDatepicker'
