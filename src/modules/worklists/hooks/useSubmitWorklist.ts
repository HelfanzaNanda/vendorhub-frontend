import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { submitWorklistApi } from '../api/submit.api'
import { WORKLIST_QUERY_KEYS } from '../constants'

export const useVendorCategories = () => {
  return useQuery({
    queryKey: ['vendor-categories'],
    queryFn: async () => {
      const res = await submitWorklistApi.getVendorCategories()
      return res?.data || res
    },
  })
}

export const useVendorCategoryItems = (categoryId: string) => {
  return useQuery({
    queryKey: ['vendor-category-items', categoryId],
    queryFn: async () => {
      const res = await submitWorklistApi.getVendorCategoryItems(categoryId)
      return res?.data || res
    },
    enabled: !!categoryId,
  })
}

export const useSubmitWorklist = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) => 
            submitWorklistApi.submit(id, payload),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.detail(id) })
            queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.lists() })
        },
    })
}
