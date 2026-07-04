'use client'

import { use } from 'react'

import { Box, Skeleton, Typography } from '@mui/material'

import PageHeader from '@/components/shared/PageHeader'
import CountryForm from '@/features/country/components/CountryForm'
import { useCountry, useUpdateCountry } from '@/features/country/hooks'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditCountryPage({ params }: PageProps) {
  const { id } = use(params)

  const { data: country, isLoading, isError, error } = useCountry(id)
  const { mutate: updateCountry, isPending } = useUpdateCountry(id)

  if (isError) {
    return (
      <Box className="p-4 text-center">
        <Typography variant="h5" color="error">
          {error?.message || 'Error loading country for edit'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Header */}
      <PageHeader
        title={isLoading ? 'Loading Country...' : `Edit Country: ${country?.name}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Master' },
          { label: 'Countries', href: '/master/countries' },
          { label: 'Edit' },
        ]}
      />

      {/* Form */}
      {isLoading ? (
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
      ) : !country ? (
        <Typography>Country not found.</Typography>
      ) : (
        <CountryForm
          title={`Update details for ${country.name}`}
          initialValues={{
            name: country.name,
            iso2Code: country.iso2Code,
            phoneCode: country.phoneCode || '',
          }}
          onSubmit={(data) => updateCountry(data)}
          isLoading={isPending}
        />
      )}
    </Box>
  )
}
