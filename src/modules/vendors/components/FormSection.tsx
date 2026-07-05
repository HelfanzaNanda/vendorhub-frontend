'use client'

import { Box, Typography, Grid } from '@mui/material'

import type { FormSectionSchema } from '../schemas/types'
import FormFieldRenderer from './FormFieldRenderer'

interface FormSectionProps {
  section: FormSectionSchema
  formValues: Record<string, any>
}

export default function FormSection({ section, formValues }: FormSectionProps) {
  return (
    <Box>
      <Box className="mb-4">
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {section.title}
        </Typography>
        {section.description && (
          <Typography variant="body2" color="text.secondary">
            {section.description}
          </Typography>
        )}
      </Box>

      <Grid container spacing={4}>
        {section.fields.map((field) => {
          // Check visibility function if it exists
          if (field.visibility && !field.visibility(formValues)) {
            return null
          }

          const { xs = 12, sm, md, lg } = field.grid || {}

          return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} key={field.name}>
              <FormFieldRenderer field={field} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
