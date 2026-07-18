import React from 'react';
import { Box } from '@mui/material';
import { PlaygroundHeader } from './PlaygroundHeader';
import { PlaygroundSidebar } from './PlaygroundSidebar';
import { PlaygroundContent } from './PlaygroundContent';

export const PlaygroundLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
      <PlaygroundHeader />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <PlaygroundSidebar />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <PlaygroundContent />
        </Box>
      </Box>
    </Box>
  );
};
