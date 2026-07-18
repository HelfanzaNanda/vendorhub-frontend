import React from 'react';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import type { LayoutComponentProps } from '../layout-renderer.interface';

export const CardLayout: React.FC<LayoutComponentProps> = ({ title, description, children }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      {(title || description) && (
        <CardHeader
          title={title && <Typography variant="h6">{title}</Typography>}
          subheader={description && <Typography variant="body2">{description}</Typography>}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
