import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Product Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  price: z.number().positive('Price must be greater than zero'),
  stock: z.number().int('Stock must be an integer').nonnegative('Stock cannot be negative'),
})

export type ProductFormInput = z.infer<typeof productSchema>
