'use client'

import { useEffect, useRef, useMemo } from 'react'

import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { 
  TextField, 
  FormControlLabel, 
  Switch, 
  Checkbox,
  FormHelperText,
  FormControl,
  Autocomplete,
  InputAdornment,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'

import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'

import type { FieldSchema } from '../schemas/types'
import { useLookup } from '../hooks/useLookup'
import FileUpload from './FileUpload'
import CustomerReferenceField from './fields/CustomerReferenceField'
import TreeSelectField from './fields/TreeSelectField'
import IndustryClassificationField from './fields/IndustryClassificationField'
import { AppReactDatepicker } from '@/components/common/AppReactDatepicker'
import 'flatpickr/dist/plugins/monthSelect/style.css'

export default function FormFieldRenderer({ field }: { field: FieldSchema }) {
  const { control, setValue, watch, formState: { errors } } = useFormContext()
  const error = errors[field.name]

  // Dependency logic
  const dependencyValue = field.dependsOn ? watch(field.dependsOn) : undefined
  const previousDependencyValue = useRef(dependencyValue)

  useEffect(() => {
    if (field.dependsOn && previousDependencyValue.current !== undefined && previousDependencyValue.current !== dependencyValue) {
      // Clear the value when dependency changes
      setValue(field.name, null, { shouldValidate: true })
    }

    previousDependencyValue.current = dependencyValue
  }, [dependencyValue, field.name, field.dependsOn, setValue])

  const lookupParams = useMemo(() => {
    if (field.dependsOn && field.dependencyParam && dependencyValue !== undefined && dependencyValue !== null && dependencyValue !== '') {
      return { [field.dependencyParam]: dependencyValue }
    }

    
return undefined
  }, [field.dependsOn, field.dependencyParam, dependencyValue])

  // Fetch dynamic lookup options
  const shouldFetchLookup = field.lookupEndpoint && (!field.dependsOn || (field.dependsOn && dependencyValue))
  const { options: lookupOptions, isLoading: isLoadingLookups } = useLookup(shouldFetchLookup ? field.lookupEndpoint : undefined, lookupParams)
  
  const options = field.lookupEndpoint ? lookupOptions : (field.options || [])

  if (field.type === 'field-array') {
    return <FieldArrayRenderer field={field} />
  }

  if (field.type === 'custom-customer-references') {
    return <CustomerReferenceField field={field} />
  }

  if (field.type === 'tree-select') {
    return <TreeSelectField field={field} />
  }

  if (field.type === 'custom-industry-classifications') {
    return <IndustryClassificationField field={field} />
  }

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
          helperText: (error?.message as string) || field.helperText,
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

          case 'autocomplete': {
            const selectedOption = options.find(opt => String(opt.value) === String(value)) || null

            
return (
              <Autocomplete
                id={field.id}
                options={options}
                getOptionLabel={(option) => option.label || String(option.value)}
                isOptionEqualToValue={(option, val) => String(option.value) === String(val.value)}
                value={selectedOption}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.value : null)

                  if (field.populateFields && newValue?.data) {
                    Object.entries(field.populateFields).forEach(([sourceKey, targetRelativePath]) => {
                      const lastDot = field.name.lastIndexOf('.')
                      const basePath = lastDot !== -1 ? field.name.substring(0, lastDot) : ''
                      const targetPath = basePath ? `${basePath}.${targetRelativePath}` : targetRelativePath

                      setValue(targetPath, newValue.data[sourceKey], { shouldValidate: true })
                    })
                  }
                }}
                disabled={Boolean(field.disabled || isLoadingLookups || (field.dependsOn && !dependencyValue))}
                renderInput={(params) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { inputRef: _, ...restBaseProps } = baseProps

                  
return (
                    <TextField
                      {...params}
                      {...restBaseProps}
                      InputProps={{
                        ...params.InputProps,
                        ...restBaseProps.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingLookups ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      label={field.required ? `${field.label} *` : field.label}
                      placeholder={field.placeholder || 'Select...'}
                    />
                  )
                }}
              />
            )
          }

          case 'multi-select': {
            const currentValues = Array.isArray(value) ? value : []
            const selectedOptions = options.filter(opt => currentValues.includes(opt.value))
            
            return (
              <Autocomplete
                multiple
                id={field.id}
                options={options}
                getOptionLabel={(option) => option.label || String(option.value)}
                isOptionEqualToValue={(option, val) => String(option.value) === String(val.value)}
                value={selectedOptions}
                onChange={(event, newValue) => {
                  onChange(newValue.map(v => v.value))
                }}
                disabled={Boolean(field.disabled || isLoadingLookups || (field.dependsOn && !dependencyValue))}
                renderInput={(params) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { inputRef: _, ...restBaseProps } = baseProps

                  
return (
                    <TextField
                      {...params}
                      {...restBaseProps}
                      InputProps={{
                        ...params.InputProps,
                        ...restBaseProps.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingLookups ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      label={field.required ? `${field.label} *` : field.label}
                      placeholder={field.placeholder || 'Select multiple...'}
                    />
                  )
                }}
              />
            )
          }

          case 'date':
            return (
              <AppReactDatepicker
                label={field.required ? `${field.label} *` : field.label}
                placeholder={field.placeholder || 'Select Date'}
                error={!!error}
                helperText={(error?.message as string) || field.helperText}
                fullWidth
                disabled={field.disabled}
                value={value || ''}
                onChange={(dates: Date[]) => {
                  onChange(dates.length > 0 ? dates[0] : null)
                }}
              />
            )

          case 'date-range': {
            const currentYear = new Date().getFullYear()
            const minDate = new Date(currentYear - 4, 0, 1)

            return (
              <AppReactDatepicker
                label={field.required ? `${field.label} *` : field.label}
                placeholder={field.placeholder || 'Select Period Range'}
                error={!!error}
                helperText={(error?.message as string) || field.helperText}
                fullWidth
                disabled={field.disabled}
                value={value || []}
                options={{
                  mode: 'range',
                  minDate,
                  plugins: [
                    monthSelectPlugin({
                      shorthand: true, // Display short month names
                      dateFormat: 'M Y', // Display format
                      altFormat: 'M Y',
                    })
                  ]
                }}
                onChange={(dates: Date[]) => {
                  onChange(dates)
                  
                  // Auto-map to periodFrom and periodTo if it's the period field
                  if (field.name === 'period') {
                    if (dates.length === 2) {
                      setValue('periodFrom', dates[0], { shouldValidate: true })
                      setValue('periodTo', dates[1], { shouldValidate: true })
                    } else if (dates.length === 0) {
                      setValue('periodFrom', null)
                      setValue('periodTo', null)
                    }
                  }
                }}
              />
            )
          }

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

          case 'display':
            return (
              <Box className="w-full mt-2">
                <Typography variant="caption" color="text.secondary">
                  {field.label}
                </Typography>
                <Typography variant="body1" className="whitespace-pre-wrap mt-1">
                  {value || '-'}
                </Typography>
              </Box>
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

          case 'checkbox-group': {
            const currentValues = Array.isArray(value) ? value : []
            
            return (
              <FormControl error={!!error} component="fieldset" fullWidth>
                <Typography variant="body2" fontWeight="medium" mb={1}>
                  {field.required ? `${field.label} *` : field.label}
                </Typography>
                {isLoadingLookups ? (
                  <CircularProgress size={24} className="mt-2" />
                ) : (
                  <Box className="flex flex-row flex-wrap gap-x-6 gap-y-2 border rounded-md p-3 border-gray-200 dark:border-gray-700">
                    {options.map((opt) => (
                      <FormControlLabel
                        key={String(opt.value)}
                        control={
                          <Checkbox
                            checked={currentValues.includes(opt.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChange([...currentValues, opt.value])
                              } else {
                                onChange(currentValues.filter((v: any) => v !== opt.value))
                              }
                            }}
                            disabled={Boolean(field.disabled || (field.dependsOn && !dependencyValue))}
                            color="primary"
                          />
                        }
                        label={opt.label || String(opt.value)}
                      />
                    ))}
                  </Box>
                )}
                {(error || field.helperText) && (
                  <FormHelperText>{(error?.message as string) || field.helperText}</FormHelperText>
                )}
              </FormControl>
            )
          }

          case 'currency':
            return (
              <TextField
                {...baseProps}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={onBlur}
                InputProps={{
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
            return (
              <FormControl error={!!error} fullWidth>
                <Typography variant="body2" fontWeight="medium" mb={1}>
                  {field.required ? `${field.label} *` : field.label}
                </Typography>
                
                <FileUpload 
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={field.disabled}
                  error={!!error}
                />
                
                {(error || field.helperText) && <FormHelperText>{(error?.message as string) || field.helperText}</FormHelperText>}
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

function FieldArrayRenderer({ field }: { field: FieldSchema }) {
  const { control, formState: { errors } } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  })

  // We can treat errors[field.name] as an array of errors if it exists.
  const fieldErrors = errors[field.name] as any

  return (
    <Box className="w-full">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="subtitle1" fontWeight="bold">
          {field.label}
        </Typography>
        {!field.disabled && field.arrayItemLabel && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<i className="ri-add-line" />}
            onClick={() => {
              // Append an empty object with keys based on arrayFields
              const emptyItem: Record<string, any> = {}

              field.arrayFields?.forEach((f) => {
                emptyItem[f.name] = f.defaultValue !== undefined ? f.defaultValue : ''

                if (f.type === 'checkbox' || f.type === 'switch' || f.type === 'radio') {
                  emptyItem[f.name] = f.defaultValue !== undefined ? f.defaultValue : false
                }
              })
              append(emptyItem)
            }}
          >
            Add {field.arrayItemLabel}
          </Button>
        )}
      </Box>

      {fieldErrors?.root && (
        <Typography color="error" variant="body2" className="mb-4">
          {fieldErrors.root.message}
        </Typography>
      )}
      
      {/* Fallback for zod array level errors if root isn't populated */}
      {fieldErrors?.message && !Array.isArray(fieldErrors) && (
        <Typography color="error" variant="body2" className="mb-4">
          {fieldErrors.message}
        </Typography>
      )}

      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-4 items-start border p-4 rounded-md border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-900/50">
            <div className="flex-grow w-full md:w-auto flex flex-col md:flex-row gap-4">
              {field.arrayFields?.map((subField) => (
                <div key={subField.name} className="flex-grow">
                  <FormFieldRenderer
                    field={{
                      ...subField,
                      name: `${field.name}.${index}.${subField.name}`,
                      disabled: field.disabled || subField.disabled,
                    }}
                  />
                </div>
              ))}
            </div>
            
            {!field.disabled && (
              <div className="flex items-center justify-between w-full md:w-auto mt-2 md:mt-0 md:pt-2">
                <Button
                  variant="text"
                  color="error"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1 && field.required}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}
