'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { 
  TextField, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Checkbox,
  FormHelperText,
  FormControl,
  Autocomplete,
  InputAdornment,
  Box,
  Typography,
  Button
} from '@mui/material'

import type { FieldSchema } from '../schemas/types'
import { useLookup } from '../hooks/useLookup'

export default function FormFieldRenderer({ field }: { field: FieldSchema }) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[field.name]

  // Fetch dynamic lookup options if lookupEndpoint is defined
  const { options: lookupOptions, isLoading: isLoadingLookups } = useLookup(field.lookupEndpoint)
  const options = field.lookupEndpoint ? lookupOptions : (field.options || [])

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        // Base TextField Props for reuse
        const baseProps = {
          inputRef: ref,
          fullWidth: true,
          label: field.required ? `${field.label} *` : field.label,
          placeholder: field.placeholder,
          error: !!error,
          helperText: error?.message as string,
          disabled: field.disabled,
          InputProps: {
            readOnly: field.readonly,
          }
        }

        switch (field.type) {
          case 'text':
          case 'email':
          case 'phone':
            return (
              <TextField
                {...baseProps}
                type={field.type === 'phone' ? 'tel' : field.type}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
              />
            )

          case 'number':
            return (
              <TextField
                {...baseProps}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={onBlur}
              />
            )

          case 'textarea':
            return (
              <TextField
                {...baseProps}
                multiline
                rows={4}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
              />
            )

          case 'select':
            return (
              <TextField
                {...baseProps}
                select
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                InputLabelProps={{ shrink: value !== undefined && value !== '' }}
              >
                <MenuItem value="" disabled>
                  <em>Select {field.label}</em>
                </MenuItem>
                {isLoadingLookups ? (
                  <MenuItem disabled value="">
                    Loading options...
                  </MenuItem>
                ) : (
                  options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )

          case 'multi-select': {
            const currentValues = Array.isArray(value) ? value : []
            const selectedOptions = options.filter(opt => currentValues.includes(opt.value))
            
            return (
              <Autocomplete
                multiple
                id={field.id}
                options={options}
                getOptionLabel={(option) => option.label}
                value={selectedOptions}
                onChange={(_, newValue) => {
                  onChange(newValue.map(v => v.value))
                }}
                disabled={field.disabled || isLoadingLookups}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...baseProps}
                    label={field.required ? `${field.label} *` : field.label}
                    placeholder={field.placeholder || 'Select multiple...'}
                  />
                )}
              />
            )
          }

          case 'date':
            return (
              <TextField
                {...baseProps}
                type="date"
                InputLabelProps={{ shrink: true }}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
              />
            )

          case 'switch':
            return (
              <FormControl error={!!error} component="fieldset">
                <FormControlLabel
                  control={
                    <Switch
                      inputRef={ref}
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                      disabled={field.disabled}
                      color="primary"
                    />
                  }
                  label={field.label}
                />
                {error && <FormHelperText>{error.message as string}</FormHelperText>}
              </FormControl>
            )

          case 'checkbox':
            return (
              <FormControl error={!!error} component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={ref}
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                      disabled={field.disabled}
                      color="primary"
                    />
                  }
                  label={field.label}
                />
                {error && <FormHelperText>{error.message as string}</FormHelperText>}
              </FormControl>
            )

          case 'currency':
            return (
              <TextField
                {...baseProps}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={onBlur}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  readOnly: field.readonly,
                }}
              />
            )

          case 'percentage':
            return (
              <TextField
                {...baseProps}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={onBlur}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  readOnly: field.readonly,
                }}
              />
            )

          case 'file': {
            const hasFile = !!value
            
            return (
              <FormControl error={!!error} fullWidth>
                <Box className="flex flex-col gap-2 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-900/50">
                  <Box className="flex items-center justify-between gap-4">
                    <Box className="flex items-center gap-2">
                      <i className={`ri-file-text-line text-2xl ${hasFile ? 'text-primary' : 'text-zinc-400'}`} />
                      <Box>
                        <Typography variant="body2" fontWeight="semibold">
                          {hasFile ? `Document (ID: ${value})` : 'No document selected'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {hasFile ? 'Click remove to change' : 'Upload PDF, JPG, PNG up to 5MB'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {hasFile ? (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onChange('')}
                        startIcon={<i className="ri-delete-bin-line" />}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        startIcon={<i className="ri-upload-cloud-line" />}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]

                            if (file) {
                              // Simulate successful upload and return a dummy ID
                              const mockFileId = `file-${Math.floor(100000 + Math.random() * 900000)}`

                              onChange(mockFileId)
                            }
                          }}
                        />
                      </Button>
                    )}
                  </Box>
                </Box>
                {error && <FormHelperText>{error.message as string}</FormHelperText>}
              </FormControl>
            )
          }

          // Fallback
          default:
            return (
              <TextField
                {...baseProps}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
              />
            )
        }
      }}
    />
  )
}
