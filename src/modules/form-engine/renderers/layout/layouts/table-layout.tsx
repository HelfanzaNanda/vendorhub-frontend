import React from 'react';

import { Box, Typography } from '@mui/material';

import type { LayoutComponentProps } from '../layout-renderer.interface';

export const TableLayout: React.FC<LayoutComponentProps> = ({ title, description, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
      {(title || description) && (
        <Box sx={{ mb: 2 }}>
          {title && <Typography variant="h6">{title}</Typography>}
          {description && <Typography variant="body2" color="textSecondary">{description}</Typography>}
        </Box>
      )}
      
      {/* Table layouts typically require specific children (like Table, TableHead, etc.)
          or a generic wrapper. Here we simply render the children which could be the 
          TableRenderer or custom table rows. */}
      {children}
    </Box>
  );
};
