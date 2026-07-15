import { api } from '@/services/api'
import { DelegationUser } from '../context'

export const delegateWorklistApi = {
  getDelegateUsers: async (workflowTransactionStepId: number) => {
    return api.get<DelegationUser[]>(`/delegations/${workflowTransactionStepId}`)
  },

  delegate: async (workflowTransactionStepId: number, payload: any) => {
    return api.post(`/delegations/${workflowTransactionStepId}`, payload)
  }
}
