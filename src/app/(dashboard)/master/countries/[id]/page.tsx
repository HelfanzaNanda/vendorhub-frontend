'use client'

import { use, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Skeleton,
} from '@mui/material'
import dayjs from 'dayjs'

import PageHeader from '@/components/shared/PageHeader'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useCountry, useDeleteCountry } from '@/features/country/hooks'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CountryDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [deleteOpen, setDeleteOpen] = useState(false)

  // Fetch Country detail
  const { data: country, isLoading, isError, error } = useCountry(id)

  // Delete mutation
  const { mutate: deleteCountry, isPending: isDeleting } = useDeleteCountry()

  const handleDelete = () => {
    deleteCountry(id, {
      onSuccess: () => {
        setDeleteOpen(false)
        router.push('/master/countries')
      },
    })
  }

  if (isError) {
    return (
      <Box className="p-4 text-center">
        <Typography variant="h5" color="error" className="mb-4">
          {error?.message || 'Error loading country details'}
        </Typography>
        <Button component={Link} href="/master/countries" variant="contained">
          Back to List
        </Button>
      </Box>
    )
  }

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Header */}
      <PageHeader
        title={isLoading ? 'Loading Country...' : country?.name || 'Country Details'}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Master' },
          { label: 'Countries', href: '/master/countries' },
          { label: 'Details' },
        ]}
      />

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <Box className="flex flex-col gap-4">
              <Skeleton width="40%" height={40} />
              <Skeleton width="100%" height={200} />
            </Box>
          ) : !country ? (
            <Typography variant="body1">Country not found.</Typography>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <Box className="flex flex-col gap-4">
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                      {country.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" className="mt-1">
                      ISO Code: {country.code}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                      Information
                    </Typography>
                    <Grid container spacing={2} className="mt-1">
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Country Code
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {country.code}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Phone Dial Code
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {country.phoneCode || '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent className="flex flex-col gap-4">
                    <Typography variant="h6" fontWeight="bold">
                      Metadata & Actions
                    </Typography>

                    <Divider />

                    <Box className="flex flex-col gap-2">
                      <Typography variant="caption" color="text.secondary">
                        Created: {country.createdAt ? dayjs(country.createdAt).format('MMM DD, YYYY hh:mm A') : '-'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated: {country.updatedAt ? dayjs(country.updatedAt).format('MMM DD, YYYY hh:mm A') : '-'}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box className="flex flex-col gap-2 mt-2">
                      <Button
                        component={Link}
                        href={`/master/countries/${country.id}/edit`}
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<i className="ri-edit-box-line" />}
                      >
                        Edit Country
                      </Button>
                      <Button
                        onClick={() => setDeleteOpen(true)}
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<i className="ri-delete-bin-line" />}
                      >
                        Delete Country
                      </Button>
                      <Button component={Link} href="/master/countries" variant="text" color="secondary" fullWidth>
                        Back to Countries
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={deleteOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this country? This action is permanent and cannot be undone."
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmColor="error"
      />
    </Box>
  )
}
