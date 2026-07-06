'use client'

import Link from 'next/link'

import { Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Skeleton } from '@mui/material'

import { useAuthStore } from '@/features/auth/store'
import { useProducts } from '@/features/product/hooks'

export default function DashboardPage() {
  const { user } = useAuthStore()
  
  // Fetch all products (limit high to calculate stats)
  const { data, isLoading } = useProducts({ limit: 100 })
  const products = data?.data?.products || []

  // Calculate statistics
  const totalProducts = data?.data?.total || 0
  const totalStockValue = products.reduce((acc, p) => acc + p.price * p.stock, 0)
  const outOfStockCount = products.filter((p) => p.stock === 0).length
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length

  // Recent 5 products
  const recentProducts = products.slice(0, 5)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <Box className="flex flex-col gap-6 p-4">
      {/* Welcome Header */}
      <Box className="flex flex-col gap-1">
        <Typography variant="h4" color="text.primary" fontWeight="bold">
          Welcome back, {user ? (user.vendor?.companyName || user.firstname) : 'User'}! 👋🏻
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is a summary of your VendorHub inventory status.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderLeft: '4px solid var(--mui-palette-primary-main)' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Products
              </Typography>
              {isLoading ? (
                <Skeleton width="60%" height={40} />
              ) : (
                <Typography variant="h4" color="text.primary" fontWeight="bold">
                  {totalProducts}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderLeft: '4px solid #22c55e' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Inventory Value
              </Typography>
              {isLoading ? (
                <Skeleton width="80%" height={40} />
              ) : (
                <Typography variant="h4" color="text.primary" fontWeight="bold">
                  {formatCurrency(totalStockValue)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderLeft: '4px solid #ef4444' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Out of Stock Items
              </Typography>
              {isLoading ? (
                <Skeleton width="40%" height={40} />
              ) : (
                <Typography variant="h4" color="error" fontWeight="bold">
                  {outOfStockCount}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderLeft: '4px solid #f59e0b' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Low Stock Alert (≤ 5)
              </Typography>
              {isLoading ? (
                <Skeleton width="40%" height={40} />
              ) : (
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  {lowStockCount}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        {/* Recent Products Table */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" fontWeight="bold">
                  Recent Products
                </Typography>
                <Button component={Link} href="/products" size="small" variant="text" color="primary">
                  View All
                </Button>
              </Box>

              {isLoading ? (
                <Box className="flex flex-col gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} height={40} />
                  ))}
                </Box>
              ) : recentProducts.length === 0 ? (
                <Box className="text-center p-8">
                  <Typography variant="body1" color="text.secondary">
                    No products added yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} elevation={0} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentProducts.map((product) => (
                        <TableRow key={product.id} hover>
                          <TableCell sx={{ fontWeight: 'medium' }}>
                            <Link href={`/products/${product.id}`} className="hover:underline text-primary">
                              {product.name}
                            </Link>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                          <TableCell align="right">
                            <Box
                              sx={{
                                color: product.stock === 0 ? 'error.main' : product.stock <= 5 ? 'warning.main' : 'text.primary',
                                fontWeight: product.stock <= 5 ? 'bold' : 'normal',
                              }}
                            >
                              {product.stock}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" fontWeight="bold">
                Quick Actions
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mb-2">
                Frequently used management options.
              </Typography>
              <Button
                component={Link}
                href="/products/create"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<i className="ri-add-line" />}
              >
                Add New Product
              </Button>
              <Button
                component={Link}
                href="/products"
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<i className="ri-list-check" />}
              >
                Manage Inventory
              </Button>
              <Button
                onClick={() => window.open('https://nextjs.org', '_blank')}
                variant="text"
                color="secondary"
                fullWidth
                startIcon={<i className="ri-external-link-line" />}
              >
                Documentation
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
