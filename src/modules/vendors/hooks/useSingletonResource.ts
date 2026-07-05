import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createSingletonService } from '../services/vendorSingleton.service'

/**
 * Generic Singleton Hook factory
 */
export function createSingletonHooks<T = any>(endpoint: string) {
  const service = createSingletonService<T>(endpoint)

  const useGet = () => {
    return useQuery({
      queryKey: [endpoint],
      queryFn: () => service.get(),
      select: (res: any) => res?.data || null,
    })
  }

  const useUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (data: Partial<T>) => service.update(data),
      onSuccess: (res: any) => {
        queryClient.invalidateQueries({ queryKey: [endpoint] })
        toast.success(res?.message || 'Saved successfully')
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || error?.message || 'Failed to save'
        toast.error(message)
      },
    })
  }

  return { useGet, useUpdate }
}

// Vendor Company Singleton Hooks
const vendorCompanyHooks = createSingletonHooks('/vendor-company-temps')
export const useVendorCompany = vendorCompanyHooks.useGet
export const useUpdateVendorCompany = vendorCompanyHooks.useUpdate

// Vendor Business License Singleton Hooks
const vendorBusinessLicenseHooks = createSingletonHooks('/vendor-business-license-temps')
export const useVendorBusinessLicense = vendorBusinessLicenseHooks.useGet
export const useUpdateVendorBusinessLicense = vendorBusinessLicenseHooks.useUpdate

// Vendor Document Singleton Hooks
const vendorDocumentHooks = createSingletonHooks('/vendor-document-temps')
export const useVendorDocument = vendorDocumentHooks.useGet
export const useUpdateVendorDocument = vendorDocumentHooks.useUpdate
