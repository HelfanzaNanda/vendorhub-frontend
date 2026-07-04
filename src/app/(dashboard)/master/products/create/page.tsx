'use client'

import Link from 'next/link'

import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'

import { useCreateProduct } from '@/features/product/hooks'
import ProductForm from '@/features/product/components/ProductForm'

export default function CreateProductPage() {
  const { mutate: createProduct, isPending } = useCreateProduct()

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
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>

      <ProductForm
        title="Add New Product"
        onSubmit={(data) => createProduct(data)}
        isLoading={isPending}
      />
    </Box>
  )
}
