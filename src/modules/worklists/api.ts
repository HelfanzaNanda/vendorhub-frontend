import { api } from '@/services/api'
import type { ApiResponse } from '@/services/api'
import type { WorklistSummary, WorklistFilters, PaginatedWorklist, WorklistDetailData, WorklistHistoryData } from './types'

export const worklistApi = {
  getSummary: async (workflowCode: string): Promise<ApiResponse<WorklistSummary>> => {
    return api.get<WorklistSummary>('/worklists/summary', { workflowCode })
  },

  getWorklist: async (filters: WorklistFilters): Promise<ApiResponse<PaginatedWorklist>> => {
    return api.get<PaginatedWorklist>('/worklists', filters)
  },

  getDetail: async (workflowTransactionId: string): Promise<ApiResponse<WorklistDetailData>> => {
    return api.get<WorklistDetailData>(`/worklists/${workflowTransactionId}`)
  },

  getHistories: async (workflowTransactionId: string): Promise<ApiResponse<WorklistHistoryData[]>> => {
    return api.get<WorklistHistoryData[]>(`/worklists/${workflowTransactionId}/histories`)
  },

  submitReview: async (workflowTransactionId: string, payload: any): Promise<ApiResponse<any>> => {
    return api.post<any>(`/worklists/${workflowTransactionId}/reviews`, payload)
  },

  submitAction: async (workflowTransactionId: string, payload: any): Promise<ApiResponse<any>> => {
    return api.post<any>(`/worklists/${workflowTransactionId}/action`, payload)
  }
}
