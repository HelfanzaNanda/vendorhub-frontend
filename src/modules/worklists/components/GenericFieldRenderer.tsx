import React from 'react'
import { Box, Chip, Link, Typography } from '@mui/material'
import { FieldComponentType, FormatterType, WorklistFieldSchema } from '../schemas/types'
import dayjs from 'dayjs'

interface GenericFieldRendererProps {
  value: any
  originalValue?: any
  field: WorklistFieldSchema
}

export default function GenericFieldRenderer({ value, originalValue, field }: GenericFieldRendererProps) {
  // If field provides a custom render function, use it directly
  if (field.render) {
    return <>{field.render(value, originalValue)}</>
  }

  // Handle empty or null values
  if (value === undefined || value === null || value === '') {
    return <Typography variant="body2" className="text-gray-400 italic">-</Typography>
  }

  let formattedValue = String(value)

  // Apply formatters
  if (field.formatter) {
    switch (field.formatter) {
      case 'currency':
        formattedValue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))
        break
      case 'date':
        try {
          formattedValue = dayjs(value).format('dd MMM yyyy')
        } catch (e) {
          formattedValue = String(value)
        }
        break
      case 'phone':
        formattedValue = String(value).replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')
        break
      case 'percentage':
        formattedValue = `${value}%`
        break
      case 'uppercase':
        formattedValue = String(value).toUpperCase()
        break
    }
  }

  // Apply component styling
  switch (field.component) {
    case 'badge':
      return <Chip label={formattedValue} size="small" className="font-bold" />
    case 'boolean':
      return <Typography variant="body2">{value ? 'Yes' : 'No'}</Typography>
    case 'link':
      return <Link href={String(value)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">{formattedValue}</Link>
    case 'file':
      return (
        <Box className="flex items-center gap-2 text-blue-600">
          <i className="ri-file-text-line"></i>
          <span className="font-medium">{formattedValue}</span>
        </Box>
      )
    case 'image':
      return <img src={String(value)} alt={field.label} className="max-h-32 object-contain rounded border border-gray-200" />
    case 'textarea':
      return <Typography variant="body2" className="whitespace-pre-wrap">{formattedValue}</Typography>
    default:
      return <Typography variant="body2" className="text-gray-900 break-words font-medium">{formattedValue}</Typography>
  }
}
