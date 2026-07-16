'use client'

import React, { useState, useEffect } from 'react'
import { Box, Button, CircularProgress, InputAdornment } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { api } from '@/services/api'
import type { FieldSchema } from '../schemas/types'
import OtpInput from './OtpInput'

export default function VerificationActions({ field }: { field: FieldSchema }) {
    const { setValue, watch, getValues, setError, clearErrors } = useFormContext()
    const [loadingAction, setLoadingAction] = useState<string | null>(null)
    const [otpValue, setOtpValue] = useState('')
    const [resendCountdown, setResendCountdown] = useState(0)

    const verification = field.verification
    
    if (!verification || verification.length === 0) return null

    // We store verified states in form state under `verifiedActions` object
    const verifiedActions = watch('verifiedActions') || {}
    const verifiedValues = watch('verifiedValues') || {}
    
    const fieldValue = watch(field.name)
    const isFieldEmpty = !fieldValue || String(fieldValue).trim() === ''

    // Value Change Detection - Reset Verification
    useEffect(() => {
        const storedValue = verifiedValues[field.name]
        if (storedValue !== undefined && storedValue !== fieldValue) {
            // Value changed! Reset verified actions related to this field
            const newVerifiedActions = { ...verifiedActions }
            verification.forEach(v => {
                delete newVerifiedActions[v.id]
            })
            setValue('verifiedActions', newVerifiedActions, { shouldValidate: true })
            
            const newVerifiedValues = { ...verifiedValues }
            delete newVerifiedValues[field.name]
            setValue('verifiedValues', newVerifiedValues, { shouldValidate: true })
            
            // Clear verification errors
            clearErrors(field.name)
        }
    }, [fieldValue, verifiedValues, verifiedActions, field.name, verification, setValue, clearErrors])

    // Countdown logic
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(c => c - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [resendCountdown])

    // Find the first action that is NOT verified
    const nextActionIndex = verification.findIndex(action => !verifiedActions[action.id])
    
    // If all actions verified
    if (nextActionIndex === -1) {
        return (
            <InputAdornment position="end">
                <Button variant="text" disabled color="success" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                    ✓ Verified
                </Button>
            </InputAdornment>
        )
    }

    const currentAction = verification[nextActionIndex]
    const isLoading = loadingAction === currentAction.id

    const handleAction = async (e: React.MouseEvent, actionOverride?: any) => {
        e.stopPropagation()
        e.preventDefault()

        const actionToRun = actionOverride || currentAction

        setLoadingAction(actionToRun.id)
        clearErrors(field.name)

        try {
            const currentFieldValue = getValues(field.name)
            const payload: any = {}

            switch (actionToRun.type) {
                case 'VERIFY_EMAIL':
                    payload.email = currentFieldValue
                    break
                case 'VERIFY_PHONE':
                    payload.phone = currentFieldValue
                    break
                case 'VERIFY_OTP':
                    payload.destination = currentFieldValue
                    payload.otpCode = otpValue
                    break
                case 'VERIFY_PRIVY':
                    payload.privyId = currentFieldValue
                    break
                case 'SEND_OTP':
                    payload.destination = currentFieldValue
                    payload.purpose = actionToRun.purpose
                    break
                default:
                    payload.purpose = actionToRun.purpose
                    break
            }
            
            // Calling the endpoint
            await api.post(actionToRun.endpoint, payload)

            // Save success status
            setValue(`verifiedActions.${actionToRun.id}`, true, { shouldValidate: true })
            
            if (actionToRun.type === 'SEND_OTP') {
                setResendCountdown(60) // Start resend countdown when OTP is sent
            } else if (actionToRun.type !== 'VERIFY_OTP') {
                toast.success(`✓ ${actionToRun.label.replace('Check ', '').replace('Verify ', '')} verified`)
            } else {
                toast.success(`✓ OTP verified`)
            }

            // Save verified value when the LAST required step is done, or maybe on first step?
            // Usually tracking the primary field value is enough on ANY successful verification step
            setValue(`verifiedValues.${field.name}`, currentFieldValue, { shouldValidate: true })
        } catch (err: any) {
            console.error(err)
            const errMsg = err?.response?.data?.message || err.message || 'Verification failed'
            setError(field.name, { type: 'manual', message: errMsg })
        } finally {
            setLoadingAction(null)
        }
    }

    const handleResend = (e: React.MouseEvent) => {
        // Re-trigger SEND_OTP action, which should be the action before VERIFY_OTP
        const sendOtpAction = verification.find(v => v.type === 'SEND_OTP')
        if (sendOtpAction) {
            handleAction(e, sendOtpAction)
        }
    }

    if (currentAction.type === 'VERIFY_OTP') {
        const isResendLoading = loadingAction === verification.find(v => v.type === 'SEND_OTP')?.id
        
        return (
            <Box className="mt-2 flex flex-col gap-2">
                <Box className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <OtpInput 
                        value={otpValue}
                        onChange={setOtpValue}
                        disabled={isLoading || isResendLoading}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={isLoading || otpValue.length < 6 || isResendLoading}
                        onClick={handleAction}
                        sx={{ textTransform: 'none', px: 3, py: 1, minWidth: 100 }}
                    >
                        {isLoading ? 'Verifying...' : currentAction.label}
                    </Button>
                </Box>
                <Button
                    variant="text"
                    color="primary"
                    size="small"
                    disabled={resendCountdown > 0 || isLoading || isResendLoading}
                    onClick={handleResend}
                    sx={{ textTransform: 'none', alignSelf: 'flex-start', p: 0, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}
                >
                    {isResendLoading ? 'Sending...' : resendCountdown > 0 ? `Resend OTP (${resendCountdown}s)` : 'Resend OTP'}
                </Button>
            </Box>
        )
    }

    return (
        <InputAdornment position="end">
            <Button
                variant={currentAction.type === 'SEND_OTP' ? 'outlined' : 'text'}
                color="primary"
                size="small"
                disabled={isLoading || isFieldEmpty}
                onClick={handleAction}
                sx={{ textTransform: 'none' }}
            >
                {isLoading ? <CircularProgress size={16} color="inherit" /> : currentAction.label}
            </Button>
        </InputAdornment>
    )
}
