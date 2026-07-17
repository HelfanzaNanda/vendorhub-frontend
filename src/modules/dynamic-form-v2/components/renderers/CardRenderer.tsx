import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

interface SectionRendererProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const CardRenderer: React.FC<SectionRendererProps> = ({ title, description, children }) => {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      {title && (
        <CardHeader 
          title={title} 
          subheader={description} 
          titleTypographyProps={{ variant: 'h6' }} 
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
