import React from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface VerifyButtonProps {
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    verified?: boolean;
    otpRequested?: boolean;
}

export const VerifyButton: React.FC<VerifyButtonProps> = ({
    onClick,
    loading,
    disabled,
    verified,
    otpRequested
}) => {
    if (verified) {
        return (
            <Box display="flex" alignItems="center" gap={0.5} color="success.main" ml={1}>
                <CheckCircleIcon fontSize="small" />
                <Typography variant="body2" fontWeight="bold">
                    Verified
                </Typography>
            </Box>
        );
    }

    if (otpRequested) {
        return null;
    }

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={disabled || loading}
            startIcon={loading && <CircularProgress size={16} color="inherit" />}
            size="small"
            sx={{ textTransform: 'none', borderRadius: 2, ml: 1, minWidth: 90 }}
        >
            {loading ? 'Sending OTP...' : 'Verify'}
        </Button>
    );
};
