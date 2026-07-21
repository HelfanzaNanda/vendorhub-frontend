import React from 'react';

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import type { LayoutComponentProps } from '../layout-renderer.interface';

export const DefaultLayout: React.FC<LayoutComponentProps> = ({ title, description, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
        {children}
    </Box>
    // <Card variant="outlined" sx={{ mb: 2 }}>
    //   <CardContent>
    //   </CardContent>
    // </Card>
  );
};
