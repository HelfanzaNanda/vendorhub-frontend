"use client"

import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TabsRendererProps {
  items: TabItem[];
}

export const TabsRenderer: React.FC<TabsRendererProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {items.map((item, index) => (
            <Tab key={item.id} label={item.title} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <Box
          key={item.id}
          role="tabpanel"
          hidden={activeTab !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          sx={{ pt: 3 }}
        >
          {activeTab === index && item.content}
        </Box>
      ))}
    </Box>
  );
};
