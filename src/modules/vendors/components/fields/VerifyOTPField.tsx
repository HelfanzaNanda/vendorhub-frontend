'use client'

import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, Box, Typography, CircularProgress, TextField, FormHelperText } from '@mui/material'
import { toast } from 'sonner'
import { api } from '@/services/api'
import type { FieldSchema } from '../../schemas/types'

export default function VerifyOTPField({ field }: { field: FieldSchema }) {
    const { watch, setValue, formState: { errors } } = useFormContext()
    const email = watch('email')
    const error = errors[field.name]

    const isVerified = watch(field.name)

    const [isLoading, setIsLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [otpCode, setOtpCode] = useState('')
    const [countdown, setCountdown] = useState(0)

    // Handle countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    // Reset verification if email changes
    useEffect(() => {
        if (isVerified === true || otpSent) {
            setValue(field.name, false, { shouldValidate: true })
            setOtpSent(false)
            setOtpCode('')
            setCountdown(0)
        }
    }, [email])

    const handleSendOTP = async () => {
        if (!email) {
            toast.error('Email is required to send OTP')
            return
        }

        setIsLoading(true)
        try {
            await api.post('/verifications/otp/send', { email })
            setOtpSent(true)
            setCountdown(60) // Start 60s countdown
            toast.success('OTP sent successfully. Please check your email.')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to send OTP')
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async () => {
        if (!otpCode) {
            toast.error('Please enter the OTP code')
            return
        }

        setIsLoading(true)
        try {
            await api.post('/verifications/otp/verify', { email, code: otpCode })
            setValue(field.name, true, { shouldValidate: true })
            toast.success('OTP verified successfully')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Invalid OTP code')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className="w-full">
            {!isVerified ? (
                <Box className="flex items-start gap-2">
                    <TextField
                        fullWidth
                        label={field.required ? `${field.label} *` : field.label}
                        placeholder={otpSent ? "Enter OTP Code" : "OTP Code"}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        disabled={isLoading || !otpSent}
                        error={!!error}
                    />
                    <Button
                        variant="contained"
                        onClick={otpSent ? (otpCode ? handleVerifyOTP : handleSendOTP) : handleSendOTP}
                        disabled={isLoading || !email || (otpSent && countdown > 0 && !otpCode)}
                        startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                        sx={{ height: 56, minWidth: '130px' }}
                        className="shadow-none"
                    >
                        {otpSent 
                            ? (otpCode 
                                ? 'Verify OTP' 
                                : countdown > 0 ? `Resend (${countdown}s)` : 'Resend OTP') 
                            : 'Send OTP'}
                    </Button>
                </Box>
            ) : (
                <Box className="flex items-center gap-2 h-[56px] px-3 border rounded border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-900/50">
                    <Typography variant="body1" className="text-gray-500 line-through select-none flex-grow">
                        {otpCode || '******'}
                    </Typography>
                    <Typography variant="body2" className="text-green-600 font-medium flex items-center gap-1">
                        <i className="ri-checkbox-circle-fill" /> OTP Verified
                    </Typography>
                </Box>
            )}

            <Box className="mt-1 min-h-[24px]">
                {error && !isVerified && (
                    <FormHelperText error>{error.message as string}</FormHelperText>
                )}
                {!error && otpSent && !isVerified && (
                    <Typography variant="caption" color="text.secondary">
                        OTP sent to {email}. Valid for 5 minutes.
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
