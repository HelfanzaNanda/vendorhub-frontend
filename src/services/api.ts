import { apiClient } from './axios'

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export const api = {
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url, { params })

    return response.data
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data)

    return response.data
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data)

    return response.data
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url)

    return response.data
  },
}
