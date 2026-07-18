import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

export const PlaygroundHeader: React.FC = () => {
  return (
    <Box sx={{ px: 3, pt: 3, pb: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dynamic Form Playground
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Development Environment
      </Typography>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};
