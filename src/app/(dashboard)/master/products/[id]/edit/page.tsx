'use client'

import { use } from 'react'

import Link from 'next/link'

import { Box, Breadcrumbs, Link as MuiLink, Typography, Skeleton } from '@mui/material'

import { useProduct, useUpdateProduct } from '@/features/product/hooks'
import ProductForm from '@/features/product/components/ProductForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)
  const product = data?.data

  const { mutate: updateProduct, isPending } = useUpdateProduct(id)

  if (error) {
    return (
      <Box className="p-4 text-center">
        <Typography variant="h5" color="error">
          Error loading product for edit
        </Typography>
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
        {product && (
          <MuiLink component={Link} underline="hover" color="inherit" href={`/master/products/${id}`}>
            {product.name}
          </MuiLink>
        )}
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>

      {isLoading ? (
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
      ) : !product ? (
        <Typography>Product not found.</Typography>
      ) : (
        <ProductForm
          title={`Edit Product: ${product.name}`}
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
          }}
          onSubmit={(data) => updateProduct(data)}
          isLoading={isPending}
        />
      )}
    </Box>
  )
}
