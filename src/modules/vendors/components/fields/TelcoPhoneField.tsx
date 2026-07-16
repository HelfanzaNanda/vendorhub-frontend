'use client'

import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { TextField, Box, Typography } from '@mui/material'

import { useLookup } from '../../hooks/useLookup'
import type { FieldSchema } from '../../schemas/types'

export default function TelcoPhoneField({ field }: { field: FieldSchema }) {
  const { control, formState: { errors }, setError, clearErrors } = useFormContext()
  const error = errors[field.name]

  const { options, isLoading } = useLookup('telco-prefixes')

  const [localError, setLocalError] = useState<string | null>(null)

  return (
    <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value.replace(/\D/g, '') // only numbers

            onChange(val)
            
            if (val.length >= 4) {
                const isValidPrefix = options.some(opt => val.startsWith( String(opt.value).replace(/\D/g, '')))
                if (!isValidPrefix) {
                    setLocalError('Invalid telco prefix')
                    setError(field.name, { type: 'manual', message: 'Invalid telco prefix' })
                } else {
                    setLocalError(null)
                    clearErrors(field.name)
                }
            } else if (val.length > 0) {
                setLocalError(null)
                clearErrors(field.name)
            }
        }

      return (
          <TextField
            inputRef={ref}
            fullWidth
            label={field.required ? `${field.label} *` : field.label}
            placeholder={field.placeholder || 'e.g. 08123456789'}
            error={!!error || !!localError}
            helperText={(error?.message as string) || localError || field.helperText}
            disabled={field.disabled || isLoading}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            InputProps={{
              readOnly: field.readonly,
            }}
          />
        )
      }}
    />
  )
}
