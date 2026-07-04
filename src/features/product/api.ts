import type { ApiResponse } from '@/services/api'
import type { Product, ProductFilters, PaginatedProducts } from './types'
import type { ProductFormInput } from './schema'

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'IBM ThinkPad T14 Gen 4',
    description: 'High-performance business laptop equipped with AMD Ryzen 7 and 32GB RAM.',
    category: 'Laptops',
    price: 1249.99,
    stock: 25,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Dell UltraSharp U2723QE',
    description: '27-inch 4K USB-C Hub Monitor with IPS Black technology for brilliant contrast.',
    category: 'Monitors',
    price: 499.00,
    stock: 12,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Logitech MX Master 3S Mouse',
    description: 'Ergonomic wireless mouse with silent clicks and 8K DPI tracking capability.',
    category: 'Accessories',
    price: 99.99,
    stock: 45,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Apple MacBook Pro 16 M3',
    description: 'Powerhouse laptop featuring M3 Pro chip, 18GB Unified memory and 512GB SSD.',
    category: 'Laptops',
    price: 2499.00,
    stock: 4,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Keychron K2 Mechanical Keyboard',
    description: '75% Layout Bluetooth mechanical keyboard with Gateron G Pro switches.',
    category: 'Accessories',
    price: 89.00,
    stock: 0,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const getStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const prods = localStorage.getItem('vendorhub_products')

  if (!prods) {
    localStorage.setItem('vendorhub_products', JSON.stringify(DEFAULT_PRODUCTS))

    return DEFAULT_PRODUCTS
  }

  return JSON.parse(prods)
}

const saveProducts = (prods: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vendorhub_products', JSON.stringify(prods))
  }
}

export const productApi = {
  getProducts: async (filters: ProductFilters): Promise<ApiResponse<PaginatedProducts>> => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    let products = getStoredProducts()

    if (filters.search) {
      const q = filters.search.toLowerCase()

      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }

    if (filters.category && filters.category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase())
    }

    const sortField = filters.sortField || 'createdAt'
    const sortOrder = filters.sortOrder || 'desc'

    products = [...products].sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = (bVal as string).toLowerCase()
      }

      if (aVal < bVal) {
        return sortOrder === 'asc' ? -1 : 1
      }

      if (aVal > bVal) {
        return sortOrder === 'asc' ? 1 : -1
      }

      return 0
    })

    const allProducts = getStoredProducts()
    const categories = Array.from(new Set(allProducts.map((p) => p.category)))

    const page = filters.page || 1
    const limit = filters.limit || 10
    const total = products.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const paginatedProducts = products.slice(startIndex, startIndex + limit)

    return {
      success: true,
      data: {
        products: paginatedProducts,
        total,
        page,
        limit,
        totalPages,
        categories,
      },
    }
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const products = getStoredProducts()
    const product = products.find((p) => p.id === id)

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      success: true,
      data: product,
    }
  },

  createProduct: async (input: ProductFormInput): Promise<ApiResponse<Product>> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const products = getStoredProducts()

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      stock: input.stock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.unshift(newProduct)
    saveProducts(products)

    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    }
  },

  updateProduct: async (id: string, input: ProductFormInput): Promise<ApiResponse<Product>> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const products = getStoredProducts()
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) {
      throw new Error('Product not found')
    }

    const updatedProduct: Product = {
      ...products[index],
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      stock: input.stock,
      updatedAt: new Date().toISOString(),
    }

    products[index] = updatedProduct
    saveProducts(products)

    return {
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    }
  },

  deleteProduct: async (id: string): Promise<ApiResponse<null>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const products = getStoredProducts()
    const filtered = products.filter((p) => p.id !== id)

    if (filtered.length === products.length) {
      throw new Error('Product not found')
    }

    saveProducts(filtered)

    return {
      success: true,
      message: 'Product deleted successfully',
      data: null,
    }
  },
}
