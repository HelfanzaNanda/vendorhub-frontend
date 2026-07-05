import { api } from '@/services/api'
import type { ApiResponse } from '@/services/api'

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPage: number
  }
}

export interface CrudFilters {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  [key: string]: any
}

/**
 * Creates a generic CRUD API service for a given base endpoint.
 * Usage: const myService = createCrudService('/vendor-personnel-temp')
 */
export function createCrudService<T = any>(baseEndpoint: string) {
  return {
    list: async (filters?: CrudFilters): Promise<ApiResponse<PaginatedResponse<T>>> => {
      return api.get<PaginatedResponse<T>>(baseEndpoint, filters)
    },

    getById: async (id: string | number): Promise<ApiResponse<T>> => {
      return api.get<T>(`${baseEndpoint}/${id}`)
    },

    create: async (data: Partial<T>): Promise<ApiResponse<T>> => {
      return api.post<T>(baseEndpoint, data)
    },

    update: async (id: string | number, data: Partial<T>): Promise<ApiResponse<T>> => {
      return api.put<T>(`${baseEndpoint}/${id}`, data)
    },

    remove: async (id: string | number, data?: any): Promise<ApiResponse<null>> => {
      return api.delete<null>(`${baseEndpoint}/${id}`, data)
    },

    /**
     * For form-type tabs that have a single save endpoint.
     */
    save: async (data: any): Promise<ApiResponse<T>> => {
      return api.post<T>(`${baseEndpoint}/save`, data)
    },
  }
}

export type CrudService<T = any> = ReturnType<typeof createCrudService<T>>
