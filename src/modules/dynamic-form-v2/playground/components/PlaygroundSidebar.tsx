'use client';
import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemButton, ListSubheader } from '@mui/material';
import { SchemaRegistry, PlaygroundSchema, SchemaCategory } from '../registry';

interface PlaygroundSidebarProps {
  selectedSchema: PlaygroundSchema | null;
  onSelectSchema: (schema: PlaygroundSchema) => void;
}

export const PlaygroundSidebar: React.FC<PlaygroundSidebarProps> = ({ selectedSchema, onSelectSchema }) => {
  const groupedSchemas = SchemaRegistry.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<SchemaCategory, PlaygroundSchema[]>);

  return (
    <Paper 
      elevation={0}
      square
      sx={{ 
        width: { xs: '100%', sm: 240, md: 280 }, 
        height: { xs: 250, md: '100%' },
        flexShrink: 0,
        borderRight: { xs: 0, md: 1 },
        borderBottom: { xs: 1, md: 0 },
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">
          Schemas
        </Typography>
      </Box>
      <List 
        sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}
        subheader={<li />}
      >
        {Object.entries(groupedSchemas).map(([category, schemas]) => (
          <li key={category}>
            <ul style={{ padding: 0, margin: 0 }}>
              <ListSubheader sx={{ bgcolor: 'background.paper', fontWeight: 'bold' }}>
                {category}
              </ListSubheader>
              {schemas.map((schema) => (
                <ListItem key={schema.id} disablePadding>
                  <ListItemButton 
                    selected={selectedSchema?.id === schema.id}
                    onClick={() => onSelectSchema(schema)}
                  >
                    <ListItemText primary={schema.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Paper>
  );
};
