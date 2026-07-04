'use client'

import { use, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Box, Card, CardContent, Typography, Button, Breadcrumbs, Link as MuiLink, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, Skeleton } from '@mui/material'
import dayjs from 'dayjs'

import { useProduct, useDeleteProduct } from '@/features/product/hooks'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [deleteOpen, setDeleteOpen] = useState(false)

  // Fetch product detail
  const { data, isLoading, error } = useProduct(id)
  const product = data?.data

  // Delete mutation
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handleDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        router.push('/master/products')
      },
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  if (error) {
    return (
      <Box className="p-4 text-center">
        <Typography variant="h5" color="error" className="mb-4">
          Error loading product details
        </Typography>
        <Button component={Link} href="/master/products" variant="contained">
          Back to List
        </Button>
      </Box>
    )
  }

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <MuiLink component={Link} underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </MuiLink>
        <Typography color="text.secondary">Master</Typography>
        <MuiLink component={Link} underline="hover" color="inherit" href="/master/products">
          Products
        </MuiLink>
        <Typography color="text.primary">Details</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <Box className="flex flex-col gap-4">
              <Skeleton width="40%" height={40} />
              <Skeleton width="100%" height={200} />
            </Box>
          ) : !product ? (
            <Typography variant="body1">Product not found.</Typography>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <Box className="flex flex-col gap-4">
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Category: {product.category}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent className="flex flex-col gap-4">
                    <Typography variant="h6" fontWeight="bold">
                      Pricing & Stock
                    </Typography>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Price
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="primary.main">
                        {formatCurrency(product.price)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Stock Status
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color={product.stock === 0 ? 'error.main' : product.stock <= 5 ? 'warning.main' : 'success.main'}
                      >
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} Units Available`}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box className="flex flex-col gap-2">
                      <Typography variant="caption" color="text.secondary">
                        Created: {dayjs(product.createdAt).format('MMM DD, YYYY hh:mm A')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated: {dayjs(product.updatedAt).format('MMM DD, YYYY hh:mm A')}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box className="flex flex-col gap-2 mt-2">
                      <Button
                        component={Link}
                        href={`/master/products/${product.id}/edit`}
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<i className="ri-edit-box-line" />}
                      >
                        Edit Product
                      </Button>
                      <Button
                        onClick={() => setDeleteOpen(true)}
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<i className="ri-delete-bin-line" />}
                      >
                        Delete Product
                      </Button>
                      <Button component={Link} href="/master/products" variant="text" color="secondary" fullWidth>
                        Back to Inventory
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => !isDeleting && setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} color="secondary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
