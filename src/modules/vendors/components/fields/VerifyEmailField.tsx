'use client'

import { useState, useEffect } from 'react'

import { useFormContext } from 'react-hook-form'
import { Button, Box, Typography, CircularProgress } from '@mui/material'
import { toast } from 'sonner'

import { api } from '@/services/api'
import type { FieldSchema } from '../../schemas/types'

export default function VerifyEmailField({ field }: { field: FieldSchema }) {
    const { watch, setValue } = useFormContext()
    const email = watch('email')

    const isAvailable = watch(field.name)

    const [isLoading, setIsLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState<string | null>(null)

    // Reset verification if email changes
    useEffect(() => {
        if (isAvailable === true || errorStatus !== null) {
            setValue(field.name, false, { shouldValidate: true })
            setErrorStatus(null)
        }
    }, [email])

    const handleCheck = async () => {
        if (!email) {
            toast.error('Email is required')

            return
        }

        setIsLoading(true)
        setErrorStatus(null)

        try {
            // Assuming endpoint is /verifications/email/check
            await api.post('/verifications/email/check', { email })
            setValue(field.name, true, { shouldValidate: true })
            toast.success('Email is available')
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Email verification failed'

            setErrorStatus(msg)
            setValue(field.name, false, { shouldValidate: true })
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className="w-full flex flex-col gap-2 p-4 border rounded-lg bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-gray-700">
            <Typography variant="subtitle2" fontWeight="bold">
                {field.label}
            </Typography>

            <Box className="flex flex-col items-start gap-4 mt-2">
                <Button
                    variant="contained"
                    onClick={handleCheck}
                    disabled={isLoading || !email || isAvailable === true}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <i className="ri-mail-check-line" />}
                >
                    {isAvailable ? 'Checked' : 'Check Email'}
                </Button>

                {isAvailable === true && (
                    <Typography variant="caption" className="text-green-600 flex items-center gap-1">
                        <i className="ri-checkbox-circle-fill" /> Email Available
                    </Typography>
                )}
                {errorStatus && (
                    <Typography variant="caption" className="text-red-600 flex items-center gap-1">
                        <i className="ri-close-circle-fill" /> {errorStatus.includes('Used') || errorStatus.includes('used') ? 'Email Already Used' : errorStatus.includes('Disposable') || errorStatus.includes('disposable') ? 'Disposable Email' : errorStatus}
                    </Typography>
                )}

            </Box>
        </Box>
    )
}
