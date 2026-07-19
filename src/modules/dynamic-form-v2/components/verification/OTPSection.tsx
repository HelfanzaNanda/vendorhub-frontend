import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { OTPInput } from './OTPInput';
import { Countdown } from './Countdown';
import { VerificationMessage } from './VerificationMessage';

interface OTPSectionProps {
    phoneNumber: string;
    value: string;
    countdownSeconds: number;
    loading?: boolean;
    error?: string;
    onChange: (value: string) => void;
    onComplete: (value: string) => void;
    onResend: () => void;
}

export const OTPSection: React.FC<OTPSectionProps> = ({
    phoneNumber,
    value,
    countdownSeconds,
    loading,
    error,
    onChange,
    onComplete,
    onResend
}) => {
    // Mask phone number
    const maskPhone = (phone: string) => {
        if (!phone || phone.length < 8) return phone;
        const first = phone.slice(0, 4);
        const last = phone.slice(-4);
        return `${first} •••• ${last}`;
    };

    return (
        <Paper 
            variant="outlined" 
            sx={{ 
                mt: 2, 
                p: 3, 
                borderRadius: 3, 
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)'
            }}
        >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <LockOutlinedIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" fontWeight="bold">
                    Phone Verification
                </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
                We've sent a verification code to
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                {maskPhone(phoneNumber)}
            </Typography>

            <Box mb={1} width="100%">
                <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                    Verification Code
                </Typography>
                <Box display="flex" justifyContent="center">
                    <OTPInput
                        value={value}
                        disabled={loading}
                        onChange={onChange}
                        onComplete={onComplete}
                    />
                </Box>
            </Box>

            {error && (
                <Box mt={1} mb={2} display="flex" justifyContent="center">
                    <VerificationMessage type="error" message="❌ Invalid verification code" />
                </Box>
            )}

            <Box mt={3}>
                <Countdown
                    seconds={countdownSeconds}
                    onResend={onResend}
                    loading={loading}
                />
            </Box>
        </Paper>
    );
};
