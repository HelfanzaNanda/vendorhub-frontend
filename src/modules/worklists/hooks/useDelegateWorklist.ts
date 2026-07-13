import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { delegateWorklistApi } from '../api/delegate.api'
import { WORKLIST_QUERY_KEYS } from '../constants'

export const useDelegateUsers = (workflowTransactionId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['delegate-users', workflowTransactionId],
    queryFn: async () => {
      const res = await delegateWorklistApi.getDelegateUsers(workflowTransactionId)
      return res?.data || res
    },
    enabled,
  })
}

export const useDelegateWorklist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => 
      delegateWorklistApi.delegate(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.detail(id) })
      queryClient.invalidateQueries({ queryKey: WORKLIST_QUERY_KEYS.lists() })
    }
  })
}
