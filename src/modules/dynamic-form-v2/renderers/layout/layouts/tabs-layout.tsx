import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import type { LayoutComponentProps } from '../layout-renderer.interface';

export const TabsLayout: React.FC<LayoutComponentProps> = ({ title, description, children, props }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // If the consumer passes tabs config through props
  const tabs = (props?.tabs as Array<{ id: string; label: string }>) || [];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {(title || description) && (
        <Box sx={{ mb: 2 }}>
          {title && <Typography variant="h6">{title}</Typography>}
          {description && <Typography variant="body2" color="textSecondary">{description}</Typography>}
        </Box>
      )}
      
      {tabs.length > 0 && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab, index) => (
              <Tab key={tab.id} label={tab.label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Render children directly. Active tab logic must be handled by children wrappers if necessary, or we just render all children here. */}
      {children}
    </Box>
  );
};
