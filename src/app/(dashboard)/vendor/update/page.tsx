'use client'

import React, { Suspense } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/services/api'


import PageHeader from '@/components/shared/PageHeader'
import { useAuthStore } from '@/features/auth/store'

function UpdateVendorPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const isPreReg = user?.type === 'EXTERNAL' && user?.vendor?.vendorStatus?.code === 'PRE_REGISTRATION'
  const activeTab = isPreReg ? 'terms_conditions' : (searchParams.get('tab') || 'terms_conditions')
  
  const submitRegistrationMutation = useMutation({
    mutationFn: async () => {
      return await api.post('/vendor-registration/submit')
    },
    onSuccess: (res: any) => {
      toast.success(res?.message || 'Vendor Registration submitted successfully')
      queryClient.invalidateQueries()
      router.push('/dashboard')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to submit registration'

      toast.error(message)
    }
  })

  return (
    <Box className="flex flex-col gap-6 p-4 h-full">
      <PageHeader
        title="Update Vendor Profile"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vendor' },
          { label: 'Update Profile' },
        ]}
        actionLabel={activeTab !== 'terms_conditions' ? 'Submit' : undefined}
        actionIcon={activeTab !== 'terms_conditions' ? (submitRegistrationMutation.isPending ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-send-plane-fill" />) : undefined}
        onActionClick={activeTab !== 'terms_conditions' ? () => submitRegistrationMutation.mutate() : undefined}
        actionDisabled={submitRegistrationMutation.isPending}
      />
      
      <Box className="flex-grow">
        {/* VendorProfile was here */}
      </Box>
    </Box>
  )
}

export default function UpdateVendorPage() {
  return (
    <Suspense fallback={null}>
      <UpdateVendorPageContent />
    </Suspense>
  )
}
