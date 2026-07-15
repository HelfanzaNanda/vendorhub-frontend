import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { delegateWorklistApi } from '../api/delegate.api'
import { WORKLIST_QUERY_KEYS } from '../constants'
import { ApiResponse } from '@/services/api'
import { DelegationUser } from '../context'

export const useDelegateUsers = (workflowTransactionStepId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['delegations', workflowTransactionStepId],
    queryFn: async () => {
      const res  = await delegateWorklistApi.getDelegateUsers(workflowTransactionStepId)
      return res?.data ?? [];
    },
    enabled,
  })
}

export const useDelegateWorklist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ workflowTransactionId, workflowTransactionStepId, payload }: { workflowTransactionId : number, workflowTransactionStepId: number; payload: any }) => 
      delegateWorklistApi.delegate(workflowTransactionStepId, payload),
    onSuccess: (_, { workflowTransactionId }) => {
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.detail(workflowTransactionId) })
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.lists() })
    }
  })
}
