import { useRouter } from 'next/navigation'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { productApi } from './api'
import type { ProductFilters } from './types'
import type { ProductFormInput } from './schema'

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getProducts(filters),
  })
}

export const useProduct = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: enabled && !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ProductFormInput) => productApi.createProduct(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(response.message || 'Product created successfully')
      router.push('/master/products')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create product')
    },
  })
}

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ProductFormInput) => productApi.updateProduct(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
      toast.success(response.message || 'Product updated successfully')
      router.push(`/master/products/${id}`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update product')
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(response.message || 'Product deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete product')
    },
  })
}
