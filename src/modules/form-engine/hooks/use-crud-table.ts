import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCrudService, CrudFilters } from '../services'

/**
 * Generic CRUD hook for a given API endpoint.
 * Handles list, create, update, delete with automatic cache invalidation.
 */
export function useCrudTable<T = any>(endpoint: string, filters?: CrudFilters) {
    const queryClient = useQueryClient()
    const service = createCrudService<T>(endpoint)
    const queryKey = [endpoint, filters]

    const listQuery = useQuery({
        queryKey,
        queryFn: () => service.list(filters),
        enabled: !!endpoint,
        select: (response: any) => {
            const payload = response?.data || response

            return {
                rows: payload?.data || [],
                total: payload?.meta?.total || 0,
                page: payload?.meta?.page || 1,
                limit: payload?.meta?.limit || 10,
                totalPages: payload?.meta?.totalPage || 0,
            }
        },
    })

    const createMutation = useMutation({
        mutationFn: (data: Partial<T>) => service.create(data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [endpoint] })
            toast.success(response?.message || 'Record created successfully')
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || error?.message || 'Failed to create record'

            toast.error(message)
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<T> }) =>
            service.update(id, data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [endpoint] })
            toast.success(response?.message || 'Record updated successfully')
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || error?.message || 'Failed to update record'

            toast.error(message)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (params: string | number | { id: string | number; data?: any }) => {
            if (typeof params === 'object' && params !== null) {
                return service.remove(params.id, params.data)
            }

            return service.remove(params)
        },
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [endpoint] })
            toast.success(response?.message || 'Record deleted successfully')
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || error?.message || 'Failed to delete record'

            toast.error(message)
        },
    })

    const saveMutation = useMutation({
        mutationFn: (data: any) => service.save(data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [endpoint] })
            toast.success(response?.message || 'Saved successfully')
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || error?.message || 'Failed to save'

            toast.error(message)
        },
    })

    return {
        // List state
        rows: listQuery.data?.rows || [],
        total: listQuery.data?.total || 0,
        page: listQuery.data?.page || 1,
        limit: listQuery.data?.limit || 10,
        totalPages: listQuery.data?.totalPages || 0,
        isLoading: listQuery.isLoading,
        isError: listQuery.isError,
        refetch: listQuery.refetch,
        isFetching: listQuery.isFetching,

        // CRUD mutations
        createMutation,
        updateMutation,
        deleteMutation,
        saveMutation,

        // Helper booleans
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isSaving: saveMutation.isPending,

        // Manual fetch for details
        getDetail: service.getById,
    }
}
