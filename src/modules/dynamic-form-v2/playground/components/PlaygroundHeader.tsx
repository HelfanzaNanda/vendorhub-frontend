'use client';
import React from 'react';
import { Box, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Button, FormControlLabel, Switch } from '@mui/material';
import { PlaygroundSchema } from '../registry';

interface PlaygroundHeaderProps {
  selectedSchema: PlaygroundSchema | null;
  formMode: string;
  onModeChange: (mode: string) => void;
  onValidate: () => void;
  showDependencyInspector: boolean;
  onToggleDependencyInspector: (show: boolean) => void;
  showLookupInspector: boolean;
  onToggleLookupInspector: (show: boolean) => void;
  showPayloadPreview: boolean;
  onTogglePayloadPreview: (show: boolean) => void;
}

export const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({ 
  selectedSchema, 
  formMode, 
  onModeChange, 
  onValidate,
  showDependencyInspector,
  onToggleDependencyInspector,
  showLookupInspector,
  onToggleLookupInspector,
  showPayloadPreview,
  onTogglePayloadPreview
}) => {

  return (
    <Box sx={{ px: 3, pt: 3, pb: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Dynamic Form Playground
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {selectedSchema ? `Current Schema: ${selectedSchema.title}` : 'Development Environment'}
          </Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <FormControl sx={{ minWidth: 200, width: { xs: '100%', md: 'auto' } }} size="small">
            <InputLabel>Mode</InputLabel>
            <Select
              value={formMode}
              label="Mode"
              onChange={(e) => onModeChange(e.target.value)}
            >
              <MenuItem value="CREATE">CREATE</MenuItem>
              <MenuItem value="EDIT">EDIT</MenuItem>
              <MenuItem value="READONLY">READONLY</MenuItem>
              <MenuItem value="DISABLED">DISABLED</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={onValidate}>
          Validate
        </Button>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 } }}>
          <FormControlLabel
            control={
              <Switch 
                checked={showDependencyInspector}
                onChange={(e) => onToggleDependencyInspector(e.target.checked)}
              />
            }
            label="Show Dependency Inspector"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={showLookupInspector}
                onChange={(e) => onToggleLookupInspector(e.target.checked)}
              />
            }
            label="Show Lookup Inspector"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={showPayloadPreview}
                onChange={(e) => onTogglePayloadPreview(e.target.checked)}
              />
            }
            label="Show Payload Preview"
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};
