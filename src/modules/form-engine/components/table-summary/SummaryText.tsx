import type { PropsWithChildren } from 'react';

import { Typography } from '@mui/material';

interface SummaryTextProps extends PropsWithChildren {
    color?: 'primary' | 'secondary' | 'error' | 'success';
    bold?: boolean;
}

export function SummaryText({
    children,
    bold,
}: SummaryTextProps) {
    if (
        children === null ||
        children === undefined ||
        children === ''
    ) {
        return null;
    }

    return (
        <Typography
            variant="body2"
            fontWeight={bold ? 600 : 400}
        >
            {children}
        </Typography>
    );
}
