import type { PropsWithChildren } from 'react';

import { Box } from '@mui/material';

export function SummaryCell({ children }: PropsWithChildren) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            py={0.5}
        >
            {children}
        </Box>
    );
}
