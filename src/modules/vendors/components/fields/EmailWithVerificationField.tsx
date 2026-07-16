'use client'

import { useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, Box, Typography, CircularProgress, TextField, FormHelperText } from '@mui/material'
import { toast } from 'sonner'
import { api } from '@/services/api'
import type { FieldSchema } from '../../schemas/types'

export default function EmailWithVerificationField({ field }: { field: FieldSchema }) {
    const { control, watch, setValue, formState: { errors } } = useFormContext()
    const emailValue = watch(field.name)
    const error = errors[field.name]

    // Use a separate field name for the verification status to enforce Zod validation
    const verificationFieldName = `${field.name}Available`
    const isAvailable = watch(verificationFieldName)
    const verificationError = errors[verificationFieldName]

    const [isLoading, setIsLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState<string | null>(null)

    // Reset verification if email changes
    useEffect(() => {
        if (isAvailable === true || errorStatus !== null) {
            setValue(verificationFieldName, false, { shouldValidate: true })
            setErrorStatus(null)
        }
    }, [emailValue])

    const handleCheck = async () => {
        if (!emailValue) {
            toast.error('Email is required')
            return
        }

        setIsLoading(true)
        setErrorStatus(null)

        try {
            await api.post('/verifications/email/check', { email: emailValue })
            setValue(verificationFieldName, true, { shouldValidate: true })
            toast.success('Email is available')
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Email verification failed'
            setErrorStatus(msg)
            setValue(verificationFieldName, false, { shouldValidate: true })
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className="w-full">
            <Box className="flex items-start gap-2">
                <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                            inputRef={ref}
                            fullWidth
                            label={field.required ? `${field.label} *` : field.label}
                            placeholder={field.placeholder}
                            error={!!error || (!!verificationError && !isAvailable && !errorStatus)}
                            disabled={field.disabled || isLoading}
                            value={value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            InputProps={{
                                readOnly: field.readonly,
                            }}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    onClick={handleCheck}
                    disabled={isLoading || !emailValue || isAvailable === true || !!error}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                    sx={{ height: 56, minWidth: '130px' }} // Match TextField height
                    className="shadow-none"
                >
                    {isAvailable ? 'Checked' : 'Check Email'}
                </Button>
            </Box>

            {/* Error & Status Tracking Below Field */}
            <Box className="mt-1 min-h-[24px]">
                {error && (
                    <FormHelperText error>{error.message as string}</FormHelperText>
                )}
                {!error && isAvailable === true && (
                    <Typography variant="caption" className="text-green-600 flex items-center gap-1 font-medium">
                        <i className="ri-checkbox-circle-fill" /> Email Available
                    </Typography>
                )}
                {!error && errorStatus && (
                    <Typography variant="caption" className="text-red-600 flex items-center gap-1 font-medium">
                        <i className="ri-close-circle-fill" /> {errorStatus.toLowerCase().includes('used') ? 'Email Already Used' : errorStatus.toLowerCase().includes('disposable') ? 'Disposable Email' : errorStatus}
                    </Typography>
                )}
                {!error && !isAvailable && !errorStatus && verificationError && (
                    <FormHelperText error>{verificationError.message as string}</FormHelperText>
                )}
            </Box>
        </Box>
    )
}
