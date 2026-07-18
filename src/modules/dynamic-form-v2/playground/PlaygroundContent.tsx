import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export const PlaygroundContent: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexGrow: 1 }}>
      <Card sx={{ maxWidth: 800, width: '100%', mt: 4, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Dynamic Form Preview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a schema from the left panel to begin previewing.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
