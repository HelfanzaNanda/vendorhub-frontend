import React from 'react';

import { Box, Typography } from '@mui/material';

import type { LayoutComponentProps } from '../layout-renderer.interface';

export const GridLayout: React.FC<LayoutComponentProps> = ({ title, description, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
      {(title || description) && (
        <Box sx={{ mb: 2 }}>
          {title && <Typography variant="h6">{title}</Typography>}
          {description && <Typography variant="body2" color="textSecondary">{description}</Typography>}
        </Box>
      )}
      {children}
    </Box>
  );
};
