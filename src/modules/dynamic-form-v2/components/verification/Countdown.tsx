import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface CountdownProps {
    seconds: number;
    onResend: () => void;
    loading?: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ seconds, onResend, loading }) => {
    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Code expires in
            </Typography>
            
            {seconds > 0 ? (
                <Typography variant="subtitle1" fontWeight="bold">
                    {formatTime(seconds)}
                </Typography>
            ) : (
                <Typography variant="subtitle1" fontWeight="bold" color="error.main">
                    00:00
                </Typography>
            )}

            <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                    Didn't receive the code?
                </Typography>
                <Button
                    variant="text"
                    size="small"
                    onClick={onResend}
                    disabled={loading || seconds > 0}
                    sx={{ 
                        p: 0, 
                        minWidth: 'auto', 
                        textTransform: 'none',
                        fontWeight: 'bold',
                        mt: 0.5
                    }}
                >
                    Resend OTP
                </Button>
            </Box>
        </Box>
    );
};
