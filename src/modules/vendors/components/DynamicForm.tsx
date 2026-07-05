'use client'

import { useMemo } from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Typography, Divider, Button, CardContent, CardActions } from '@mui/material'

import type { FormSchema } from '../schemas/types'
import { useVendorStore } from '../store/vendorStore'
import FormSection from './FormSection'
import { useCrudTable } from '../hooks/useCrudTable'

interface DynamicFormProps {
  schema: FormSchema
  mode: 'create' | 'update' | 'view'
  onSubmit?: (data: any) => void
  defaultValues?: Record<string, any>
  isLoading?: boolean
  showDraftButtons?: boolean
  onCancel?: () => void
  tabEndpoint?: string
}

export default function DynamicForm({
  schema,
  mode,
  onSubmit,
  defaultValues: propDefaultValues,
  isLoading = false,
  showDraftButtons = true,
  onCancel,
  tabEndpoint,
}: DynamicFormProps) {
  const { formDrafts, saveDraft, setVendorId } = useVendorStore()
  
  // Call useCrudTable if tabEndpoint is specified for saving the form tab
  const { saveMutation } = useCrudTable(tabEndpoint || '')

  // Disable all fields when in 'view' mode
  const processedSchema = useMemo(() => {
    if (mode !== 'view') return schema
    
return {
      ...schema,
      sections: schema.sections.map((sec) => ({
        ...sec,
        fields: sec.fields.map((f) => ({
          ...f,
          disabled: true,
        })),
      })),
    }
  }, [schema, mode])

  // Dynamically generate Zod schema from fields definition
  const zodSchema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {}

    processedSchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.validation) {
          shape[field.name] = field.validation
        } else {
          // Base type according to field.type
          let fieldSchema: z.ZodTypeAny
          
          switch (field.type) {
            case 'number':
              fieldSchema = z.number()
              break
            case 'checkbox':
            case 'switch':
              fieldSchema = z.boolean()
              break
            case 'autocomplete':
            case 'select':
              fieldSchema = z.union([z.number(), z.string()])
              break
            case 'multi-select':
            case 'field-array':
              fieldSchema = z.array(z.any())
              break
            case 'date':
            case 'file':
              fieldSchema = z.any()
              break
            default:
              fieldSchema = z.string()
          }

          if (field.required && !field.disabled) {
            const requiredMsg = `${field.label} is required`
            if (field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'phone' || field.type === 'currency' || field.type === 'percentage') {
              fieldSchema = z.string().min(1, requiredMsg)
            } else if (field.type === 'multi-select' || field.type === 'field-array') {
              fieldSchema = z.array(z.any()).min(1, requiredMsg)
            } else {
              fieldSchema = fieldSchema.nullable().refine((val) => val !== null && val !== undefined && val !== '', requiredMsg)
            }
          } else {
            if (field.type === 'autocomplete' || field.type === 'select' || field.type === 'date' || field.type === 'file' || field.type === 'number') {
              fieldSchema = fieldSchema.nullable().optional()
            } else {
              fieldSchema = fieldSchema.optional()
            }
          }

          shape[field.name] = fieldSchema
        }
      })
    })
    
    return z.object(shape)
  }, [processedSchema])

  // Get default values
  const defaultValues = useMemo(() => {
    const defaults: Record<string, any> = {}
    
    // First apply schema defaults based on field type
    processedSchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          defaults[field.name] = field.defaultValue
        } else if (field.type === 'field-array') {
          defaults[field.name] = []
        } else if (field.type === 'number') {
          defaults[field.name] = null
        } else if (field.type === 'checkbox' || field.type === 'switch') {
          defaults[field.name] = false
        } else if (field.type === 'date' || field.type === 'file' || field.type === 'select' || field.type === 'autocomplete') {
          defaults[field.name] = null
        } else {
          defaults[field.name] = ''
        }
      })
    })

    // Then override with propDefaultValues
    if (propDefaultValues && Object.keys(propDefaultValues).length > 0) {
      Object.assign(defaults, propDefaultValues)
    }

    // Finally override with drafts
    const savedDraft = formDrafts[processedSchema.id]

    if (savedDraft) {
      Object.assign(defaults, savedDraft)
    }

    return defaults
  }, [processedSchema, formDrafts, propDefaultValues])

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    values: defaultValues, // Use values instead of defaultValues to respond to changes in active item
    mode: 'onBlur',
  })

  const { handleSubmit, watch, formState: { isSubmitting } } = methods
  const formValues = watch()

  const stripFileObjects = (data: any): any => {
    if (!data) return data
    if (Array.isArray(data)) return data.map(stripFileObjects)
    if (typeof data === 'object') {
      const result: any = {}
      for (const key in data) {
        const val = data[key]
        // Identify FileData objects from fileService
        if (val && typeof val === 'object' && 'id' in val && 'filename' in val && 'size' in val) {
          result[key] = val.id
        } else {
          result[key] = stripFileObjects(val)
        }
      }
      return result
    }
    return data
  }

  const handleFormSubmit = async (rawData: any) => {
    const data = stripFileObjects(rawData)

    if (onSubmit) {
      onSubmit(data)
      
return
    }

    if (tabEndpoint) {
      saveDraft(schema.id, data)
      saveMutation.mutate(data, {
        onSuccess: (res: any) => {
          // Simulate generating a Vendor ID on first create of company info
          if (schema.id === 'vendor_company') {
            setVendorId(res?.data?.vendorId || 'VND-' + Math.floor(100000 + Math.random() * 900000))
          }
        },
      })
    }
  }

  const isSaving = isSubmitting || saveMutation.isPending || isLoading

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col h-full">
        <Box className="p-6 pb-2">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {schema.title}
          </Typography>
          {schema.description && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {schema.description}
            </Typography>
          )}
        </Box>
        
        <Divider />

        <CardContent className="flex-grow flex flex-col gap-8 overflow-y-auto max-h-[60vh]">
          {processedSchema.sections.map((section) => (
            <FormSection 
              key={section.id} 
              section={section} 
              formValues={formValues} 
            />
          ))}
        </CardContent>

        <Divider />

        <CardActions className="p-6 justify-end gap-2 bg-gray-50 dark:bg-red-50 rounded-b-md">
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel} disabled={isSaving}>
              Cancel
            </Button>
          )}

          {showDraftButtons && !onCancel && (
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => saveDraft(schema.id, methods.getValues())}
              disabled={isSaving}
            >
              Save Draft
            </Button>
          )}

          {mode !== 'view' && (
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSaving}
              startIcon={isSaving ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-save-line" />}
            >
              {onCancel ? 'Save' : 'Save'}
            </Button>
          )}
        </CardActions>
      </form>
    </FormProvider>
  )
}
