import type { PropsWithChildren } from 'react';

import { Box, Typography } from '@mui/material';

interface SummaryLabelProps extends PropsWithChildren {
    label: string;
}

export function SummaryLabel({
    label,
    children,
}: SummaryLabelProps) {
    if (
        children === null ||
        children === undefined ||
        children === ''
    ) {
        return null;
    }

    return (
        <Box display="flex" gap={0.5}>
            <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
            >
                {label}:
            </Typography>

            <Typography variant="body2">
                {children}
            </Typography>
        </Box>
    );
}
