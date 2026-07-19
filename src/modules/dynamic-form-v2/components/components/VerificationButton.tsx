"use client";

import React, { useState } from 'react';

import { Button, CircularProgress } from '@mui/material';

import { VerificationEngine } from '../../engines';
import type { VerificationState, VerificationSchema, FieldSchema, FormState } from '../../interfaces';
import { DynamicFormContextValue } from '../../context';

interface VerificationButtonProps {
    field: FieldSchema;
    context: DynamicFormContextValue;
    disabled?: boolean;
}

export const VerificationButton: React.FC<VerificationButtonProps> = ({
    field, context, disabled
}) => {

    const state = context.getVerification(field.name) ?? VerificationEngine.reset();


    const handleVerify = async () => {
        context.setVerification(field.name, VerificationEngine.markLoading());
        try {
            const result = await VerificationEngine.verify(field, context.values);
            context.setVerification(field.name, result);
            if (!result.verified) {
                context.setError(
                    field.name,
                    result.message ?? "Verification failed."
                );
            } else {
                context.clearError(field.name);
            }
        } catch (error: any) {
            context.setVerification(field.name, VerificationEngine.markUnverified( error?.message ?? "Verification failed." ) );
            context.setError(field.name, error?.message ?? "Verification failed.");
        }

    };


    if (state.verified) {
        return (
            <Button variant="outlined" color="success" disabled sx={{ mt: 1 }}>
                Verified
            </Button>
        );
    }

    return (
        <Button
            variant="contained"
            onClick={handleVerify}
            disabled={disabled || state.loading}
            startIcon={state.loading && <CircularProgress size={16} color="inherit" />}
            sx={{ mt: 1 }}
        >
            {state.loading ? 'Verifying...' : 'Verify'}
        </Button>
    );
};
