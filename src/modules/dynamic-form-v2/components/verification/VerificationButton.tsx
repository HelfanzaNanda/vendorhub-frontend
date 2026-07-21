"use client"

import React, { useState, useEffect } from 'react';
import { Box, InputAdornment } from '@mui/material';
import { VerificationEngine } from '../../engines';
import type { FieldSchema } from '../../interfaces';
import { DynamicFormContextValue, useDynamicFormContext } from '../../context';
import { VerifyButton } from './VerifyButton';
import { OTPSection } from './OTPSection';
import { VerificationMessage } from './VerificationMessage';

interface VerificationButtonProps {
    field: FieldSchema;
    context: DynamicFormContextValue;
    disabled?: boolean;
    children: React.ReactElement;
}

export const VerificationButton: React.FC<VerificationButtonProps> = ({
    field, context, disabled, children
}) => {
    const verificationState = context.getVerification(field.name) ?? VerificationEngine.reset();
    const [countdown, setCountdown] = useState(0);

    const phoneNumber = String(context.values[field.name] || '');

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleVerify = async () => {
        context.setVerification(field.name, {
            ...verificationState,
            loading: true,
            message: undefined
        });
        context.clearError(field.name);

        try {
            const result = await VerificationEngine.verify(field, context.values, verificationState);
            
            context.setVerification(field.name, result);

            if (!result.verified && result.message && !result.otpRequested) {
                context.setError(field.name, result.message);
            }
            if (result.otpRequested && !verificationState.otpRequested) {
                setCountdown(60);
            }
        } catch (error: any) {
            const message = error?.message ?? "Verification failed.";
            context.setVerification(field.name, VerificationEngine.markUnverified(message));
            context.setError(field.name, message);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;
        
        const resetState = {
            ...verificationState,
            loading: true,
            otpRequested: false, // reset to trigger sendOtp again
            otpCode: "",
            message: undefined
        };
        
        context.setVerification(field.name, resetState);
        context.clearError(field.name);

        try {
            const result = await VerificationEngine.verify(field, context.values, resetState);
            context.setVerification(field.name, result);
            if (!result.verified && result.message && !result.otpRequested) {
                context.setError(field.name, result.message);
            }
            if (result.otpRequested) {
                setCountdown(60);
            }
        } catch (error: any) {
            const message = error?.message ?? "Failed to resend OTP.";
            context.setVerification(field.name, VerificationEngine.markUnverified(message));
            context.setError(field.name, message);
        }
    };

    const handleOTPChange = (otp: string) => {
        context.setVerification(field.name, {
            ...verificationState,
            otpCode: otp,
            message: undefined
        });
        context.clearError(field.name);
    };

    const handleOTPComplete = async (otp: string) => {
        handleOTPChange(otp);
        const nextState = {
            ...verificationState,
            otpCode: otp,
            loading: true,
            message: undefined
        };
        context.setVerification(field.name, nextState);
        context.clearError(field.name);

        try {
            const result = await VerificationEngine.verify(field, context.values, nextState);
            context.setVerification(field.name, result);
        } catch (error: any) {
            const message = error?.message ?? "Verification failed.";
            context.setVerification(field.name, VerificationEngine.markUnverified(message));
        }
    };

    const verifyButton = (
        <InputAdornment position="end">
            <VerifyButton
                onClick={handleVerify}
                loading={verificationState.loading}
                disabled={disabled || !phoneNumber}
                otpRequested={!!verificationState.otpRequested}
                verified={verificationState.verified}
            />
        </InputAdornment>
    );

    const clonedInput = React.cloneElement(children, {
        InputProps: {
            ...children.props.InputProps,
            endAdornment: (
                <>
                    {children.props.InputProps?.endAdornment}
                    {verifyButton}
                </>
            )
        }
    });

    return (
        <Box width="100%">
            {clonedInput}

            {verificationState.verified && (
                <VerificationMessage type="success" message={verificationState.message || "successfully verified."} />
            )}

            {verificationState?.otpRequested && !verificationState.verified && (
                <OTPSection
                    phoneNumber={phoneNumber}
                    value={verificationState.otpCode ?? ""}
                    countdownSeconds={countdown}
                    loading={verificationState.loading}
                    error={verificationState.message}
                    onChange={handleOTPChange}
                    onComplete={handleOTPComplete}
                    onResend={handleResend}
                />
            )}
        </Box>
    );
};
