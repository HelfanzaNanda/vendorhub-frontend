import React from 'react';
import { Typography, Box } from '@mui/material';

interface VerificationMessageProps {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
}

export const VerificationMessage: React.FC<VerificationMessageProps> = ({ type, message }) => {
    const getColor = () => {
        switch (type) {
            case 'success': return 'success.main';
            case 'warning': return 'warning.main';
            case 'error': return 'error.main';
            case 'info': return 'info.main';
            default: return 'text.primary';
        }
    };

    return (
        <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="body2" color={getColor()} fontWeight="medium">
                {message}
            </Typography>
        </Box>
    );
};
