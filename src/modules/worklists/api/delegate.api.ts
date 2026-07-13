import { api } from '@/services/api'

export const delegateWorklistApi = {
  getDelegateUsers: async (workflowTransactionId: string) => {
    return api.get(`/worklists/${workflowTransactionId}/delegate-users`)
  },

  delegate: async (workflowTransactionId: string, payload: any) => {
    return api.post(`/worklists/${workflowTransactionId}/delegate`, payload)
  }
}
