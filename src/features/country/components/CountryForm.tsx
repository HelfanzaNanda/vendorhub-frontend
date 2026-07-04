'use client'

import Link from 'next/link'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material'

import { countrySchema, type CountryFormInput } from '../schema'

interface CountryFormProps {
  initialValues?: Partial<CountryFormInput>
  onSubmit: (data: CountryFormInput) => void
  isLoading?: boolean
  title: string
}

export default function CountryForm({ initialValues, onSubmit, isLoading = false, title }: CountryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormInput>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: initialValues?.name || '',
      iso2Code: initialValues?.iso2Code || '',
      phoneCode: initialValues?.phoneCode || '',
    },
  })

  return (
    <Card>
      <CardContent className="p-6">
        <Typography variant="h5" color="text.primary" fontWeight="bold" className="mb-6">
          {title}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Country Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="iso2Code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Country Code"
                    placeholder="e.g. US"
                    error={!!errors.iso2Code}
                    helperText={errors.iso2Code?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="phoneCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone Code"
                    placeholder="e.g. +1"
                    error={!!errors.phoneCode}
                    helperText={errors.phoneCode?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="flex justify-end gap-3 mt-4">
                <Button component={Link} href="/countries" variant="outlined" color="secondary" disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ minWidth: '100px' }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Country'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
