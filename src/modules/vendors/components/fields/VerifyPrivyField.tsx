'use client'

import { useState, useEffect } from 'react'

import { useFormContext } from 'react-hook-form'
import { Button, Box, Typography, CircularProgress } from '@mui/material'
import { toast } from 'sonner'

import { api } from '@/services/api'
import type { FieldSchema } from '../../schemas/types'

export default function VerifyPrivyField({ field }: { field: FieldSchema }) {
  const { watch, setValue, getValues } = useFormContext()
  const email = watch('email')
  const privyId = watch('privyId')
  
  const verifiedStatus = watch(field.name)

  const [isLoading, setIsLoading] = useState(false)

  // Reset verification if email or privyId changes
  useEffect(() => {
    if (verifiedStatus === true) {
      setValue(field.name, false, { shouldValidate: true })
    }
  }, [email, privyId])

  const handleVerify = async () => {
    if (!email || !privyId) {
      toast.error('Email and Privy ID are required for verification')
      
return
    }

    setIsLoading(true)

    try {
      // Assuming endpoint is /verifications/privy based on common patterns
      await api.post('/verifications/privy', { email, privyId })
      setValue(field.name, true, { shouldValidate: true })
      toast.success('Privy ID verified successfully')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Privy ID verification failed')
      setValue(field.name, false, { shouldValidate: true })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className="w-full flex flex-col gap-2 p-4 border rounded-lg bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-gray-700">
      <Typography variant="subtitle2" fontWeight="bold">
        {field.label}
      </Typography>
      {field.description && (
        <Typography variant="caption" color="text.secondary">
          {field.description}
        </Typography>
      )}

      <Box className="flex items-center gap-4 mt-2">
        <Button
          variant="contained"
          onClick={handleVerify}
          disabled={isLoading || !email || !privyId || verifiedStatus === true}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <i className="ri-shield-check-line" />}
        >
          {verifiedStatus ? 'Verified' : 'Verify Privy'}
        </Button>

        {verifiedStatus === true && (
          <Box className="flex items-center gap-1 text-green-600 font-medium bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm">
            <i className="ri-checkbox-circle-fill" /> Verified
          </Box>
        )}
        {verifiedStatus === false && email && privyId && (
          <Box className="flex items-center gap-1 text-amber-600 font-medium bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full text-sm">
            <i className="ri-error-warning-fill" /> Not Verified
          </Box>
        )}
      </Box>
    </Box>
  )
}
