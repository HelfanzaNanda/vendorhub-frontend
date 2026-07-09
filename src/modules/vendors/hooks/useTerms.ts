import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import type { SubmitVendorTermsPayload } from '../services/terms.service';
import { termsService } from '../services/terms.service'


export function useVendorTerms() {
  return useQuery({
    queryKey: ['vendor-terms'],
    queryFn: () => termsService.getVendorTerms(),
    retry: 1
  })
}

export function useMasterTerms() {
  return useQuery({
    queryKey: ['master-terms-latest'],
    queryFn: () => termsService.getLatestMasterTerms(),
    retry: 1
  })
}

export function useSubmitTerms() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: SubmitVendorTermsPayload) => termsService.submitVendorTerms(data),
    onSuccess: () => {
      toast.success('Terms & Conditions accepted successfully')
      queryClient.invalidateQueries({ queryKey: ['vendor-terms'] })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit terms & conditions')
    }
  })
}
