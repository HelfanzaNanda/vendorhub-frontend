import type { PropsWithChildren } from 'react';

import { Box, Typography } from '@mui/material';

interface SummaryGroupProps extends PropsWithChildren {
    title?: string;
}

export function SummaryGroup({
    title,
    children,
}: SummaryGroupProps) {
    return (
        <Box display="flex" flexDirection="column" gap={0.25}>
            {title && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                >
                    {title}
                </Typography>
            )}

            {children}
        </Box>
    );
}
