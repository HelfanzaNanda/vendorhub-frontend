import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export const PlaygroundSidebar: React.FC = () => {
  return (
    <Paper 
      elevation={0}
      square
      sx={{ 
        width: 280, 
        minHeight: '100%',
        p: 2,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Schemas
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Coming Soon...
      </Typography>
    </Paper>
  );
};
