'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Skeleton,
  InputAdornment,
} from '@mui/material'
import dayjs from 'dayjs'

import { useProducts, useDeleteProduct } from '@/features/product/hooks'
import type { ProductFilters } from '@/features/product/types'

export default function ProductListPage() {
  // Filter and pagination state
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'All',
    sortField: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 5,
  })

  // State for delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Fetch products
  const { data, isLoading } = useProducts(filters)
  const products = data?.data?.products || []
  const totalPages = data?.data?.totalPages || 1
  const categories = data?.data?.categories || []

  // Delete mutation
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handleSearchChange = (val: string) => {
    setFilters((prev) => ({ ...prev, search: val, page: 1 }))
  }

  const handleCategoryChange = (val: string) => {
    setFilters((prev) => ({ ...prev, category: val, page: 1 }))
  }

  const handleSortFieldChange = (val: any) => {
    setFilters((prev) => ({ ...prev, sortField: val, page: 1 }))
  }

  const handleSortOrderChange = (val: any) => {
    setFilters((prev) => ({ ...prev, sortOrder: val, page: 1 }))
  }

  const handlePageChange = (_: any, newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }))
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProduct(deleteId, {
        onSuccess: () => {
          setDeleteId(null)
        },
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Title Header */}
      <Box className="flex justify-between items-center">
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Products List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your inventory, search, and update details.
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/master/products/create"
          variant="contained"
          color="primary"
          startIcon={<i className="ri-add-line" />}
        >
          Add Product
        </Button>
      </Box>

      {/* Filters Card */}
      <Card>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <TextField
            size="small"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '200px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="ri-search-line" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            size="small"
            label="Category"
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Sort By"
            value={filters.sortField}
            onChange={(e) => handleSortFieldChange(e.target.value)}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="createdAt">Date Created</MenuItem>
            <MenuItem value="name">Product Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="stock">Stock Quantity</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Order"
            value={filters.sortOrder}
            onChange={(e) => handleSortOrderChange(e.target.value)}
            sx={{ minWidth: '100px' }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      {/* Products Table Card */}
      <Card>
        <CardContent>
          {isLoading ? (
            <Box className="flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={48} />
              ))}
            </Box>
          ) : products.length === 0 ? (
            <Box className="text-center p-12">
              <i className="ri-inbox-line text-5xl text-secondary" style={{ opacity: 0.5 }} />
              <Typography variant="h6" className="mt-3" color="text.secondary">
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mb-4">
                Try adjusting your search filters or add a new product.
              </Typography>
              <Button component={Link} href="/master/products/create" variant="outlined" color="primary">
                Add First Product
              </Button>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell sx={{ fontWeight: 'semibold' }}>
                          <Link href={`/master/products/${p.id}`} className="hover:underline text-primary">
                            {p.name}
                          </Link>
                        </TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell align="right">{formatCurrency(p.price)}</TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              color: p.stock === 0 ? 'error.main' : p.stock <= 5 ? 'warning.main' : 'text.primary',
                              fontWeight: p.stock <= 5 ? 'bold' : 'normal',
                            }}
                          >
                            {p.stock === 0 ? 'Out of Stock' : p.stock}
                          </Box>
                        </TableCell>
                        <TableCell>{dayjs(p.createdAt).format('MMM DD, YYYY')}</TableCell>
                        <TableCell align="center">
                          <IconButton component={Link} href={`/master/products/${p.id}`} size="small" color="info" title="View Detail">
                            <i className="ri-eye-line" />
                          </IconButton>
                          <IconButton component={Link} href={`/master/products/${p.id}/edit`} size="small" color="primary" title="Edit">
                            <i className="ri-edit-box-line" />
                          </IconButton>
                          <IconButton onClick={() => setDeleteId(p.id)} size="small" color="error" title="Delete">
                            <i className="ri-delete-bin-7-line" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box className="flex justify-between items-center mt-6 flex-wrap gap-4">
                <Typography variant="body2" color="text.secondary">
                  Showing {products.length} of {data?.data?.total || 0} entries
                </Typography>
                <Pagination
                  count={totalPages}
                  page={filters.page}
                  onChange={handlePageChange}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => !isDeleting && setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="secondary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
