'use client'

import Link from 'next/link'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material'

import { productSchema, type ProductFormInput } from '../schema'

interface ProductFormProps {
  initialValues?: Partial<ProductFormInput>
  onSubmit: (data: ProductFormInput) => void
  isLoading?: boolean
  title: string
}

export default function ProductForm({ initialValues, onSubmit, isLoading = false, title }: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      category: initialValues?.category || '',
      price: initialValues?.price || 0,
      stock: initialValues?.stock || 0,
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
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Product Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Category"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    fullWidth
                    label="Price ($)"
                    type="number"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    disabled={isLoading}
                    slotProps={{
                      input: { inputProps: { min: 0.01, step: 0.01 } },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    fullWidth
                    label="Stock"
                    type="number"
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                    disabled={isLoading}
                    slotProps={{
                      input: { inputProps: { min: 0, step: 1 } },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="flex justify-end gap-3 mt-4">
                <Button component={Link} href="/products" variant="outlined" color="secondary" disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ minWidth: '100px' }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Product'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
