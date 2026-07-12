import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { worklistApi } from './api'
import { WORKLIST_QUERY_KEYS } from './constants'
import type { WorklistFilters } from './types'
import { WorkflowCode } from './enums/workflow-code.enum'

export const useWorklistSummary = (workflowCode: WorkflowCode, enabled = true) => {
  return useQuery({
    queryKey: WORKLIST_QUERY_KEYS.summary(workflowCode),
    queryFn: () => worklistApi.getSummary(workflowCode),
    enabled: enabled && !!workflowCode,
    select: (response: any) => {
      return response?.data || response
    },
  })
}

export const useWorklists = (filters: WorklistFilters) => {
  return useQuery({
    queryKey: WORKLIST_QUERY_KEYS.list(filters),
    queryFn: () => worklistApi.getWorklist(filters),
    select: (response: any) => {
      const payload = response?.data || response

      return {
        data: payload?.data || [],
        total: payload?.meta?.total || 0,
        page: payload?.meta?.page || 1,
        limit: payload?.meta?.limit || 10,
        totalPages: payload?.meta?.totalPage || 0,
      }
    },
  })
}

export const useWorklistDetail = (id: string) => {
  return useQuery({
    queryKey: WORKLIST_QUERY_KEYS.detail(id),
    queryFn: async () => {
      const response = await worklistApi.getDetail(id)
      return response.data
    },
    enabled: !!id,
  })
}

export const useWorklistHistory = (id: string) => {
  return useQuery({
    queryKey: WORKLIST_QUERY_KEYS.history(id),
    queryFn: async () => {
      const response = await worklistApi.getHistories(id)
      return response.data
    },
    enabled: !!id,
  })
}

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => worklistApi.submitReview(id, payload),
  })
}

export const useSubmitAction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => worklistApi.submitAction(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.detail(id) })
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.lists() })
    }
  })
}
