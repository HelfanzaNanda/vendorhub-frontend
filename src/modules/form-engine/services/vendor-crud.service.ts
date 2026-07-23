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

        getById: async (id: string | number, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> => {
            const [path, query] = baseEndpoint.split('?');
            const search = new URLSearchParams(query);
            return api.get(
                `${path}/${id}`,
                {
                    ...Object.fromEntries(search.entries()),
                    ...params
                }
            );
        },

        create: async (data: Partial<T>): Promise<ApiResponse<T>> => {
            const [path, query] = baseEndpoint.split('?');
            const search = new URLSearchParams(query);
            return api.post<T>(path, {
                ...Object.fromEntries(search.entries()),
                ...data
            })
        },

        update: async (id: string | number, data: Partial<T>): Promise<ApiResponse<T>> => {
            const [path, query] = baseEndpoint.split('?');
            const search = new URLSearchParams(query);
            return api.put<T>(`${path}/${id}`, {
                ...Object.fromEntries(search.entries()),
                ...data
            })
        },

        remove: async (id: string | number, data?: any): Promise<ApiResponse<null>> => {
            const [path, query] = baseEndpoint.split('?');
            const search = new URLSearchParams(query);
            return api.delete<null>(`${path}/${id}`, {
                ...Object.fromEntries(search.entries()),
                ...data
            })
        },

        /**
         * For form-type tabs that have a single save endpoint.
         */
        save: async (data: any): Promise<ApiResponse<T>> => {
            return api.put<T>(baseEndpoint, data)
        },

        // create: async (data: Partial<T>): Promise<ApiResponse<T>> => {
        //     return api.post<T>(baseEndpoint, data)
        // },
    }
}

export type CrudService<T = any> = ReturnType<typeof createCrudService<T>>
