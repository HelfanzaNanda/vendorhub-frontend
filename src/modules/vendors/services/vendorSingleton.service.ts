import { api } from '@/services/api'
import type { ApiResponse } from '@/services/api'

/**
 * Creates a generic API service for a singleton resource (GET / PUT only).
 */
export function createSingletonService<T = any>(baseEndpoint: string) {
  return {
    get: async (): Promise<ApiResponse<T | null>> => {
      try {
        return await api.get<T>(baseEndpoint)
      } catch (error: any) {
        if (error?.response?.status === 404) {
          return { success: true, data: null } as ApiResponse<T | null>
        }

        throw error
      }
    },
    update: async (data: Partial<T>): Promise<ApiResponse<T>> => {
      return api.put<T>(baseEndpoint, data)
    },
  }
}

export type SingletonService<T = any> = ReturnType<typeof createSingletonService<T>>
