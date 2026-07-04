'use client'

import { Box } from '@mui/material'

import PageHeader from '@/components/shared/PageHeader'
import CountryForm from '@/features/country/components/CountryForm'
import { useCreateCountry } from '@/features/country/hooks'

export default function CreateCountryPage() {
  const { mutate: createCountry, isPending } = useCreateCountry()

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Header */}
      <PageHeader
        title="Create Country"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Master' },
          { label: 'Countries', href: '/master/countries' },
          { label: 'Create' },
        ]}
      />

      {/* Form */}
      <CountryForm
        title="New Country Details"
        onSubmit={(data) => createCountry(data)}
        isLoading={isPending}
      />
    </Box>
  )
}
