export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  search?: string
  category?: string
  sortField?: 'name' | 'price' | 'stock' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaginatedProducts {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  categories: string[]
}
