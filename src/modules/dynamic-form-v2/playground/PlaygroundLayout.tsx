'use client';
import React, { useState } from 'react';

import { Box } from '@mui/material';

import { PlaygroundHeader, PlaygroundSidebar, PlaygroundContent } from './components';
import { SchemaRegistry } from './registry';

export const PlaygroundLayout: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState(SchemaRegistry[0] || null);
  const [formMode, setFormMode] = useState<string>('CREATE');
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [showDependencyInspector, setShowDependencyInspector] = useState(false);
  const [showLookupInspector, setShowLookupInspector] = useState(false);
  const [showPayloadPreview, setShowPayloadPreview] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default',  position: 'fixed', inset: 0, }}>
      <PlaygroundHeader 
        selectedSchema={selectedSchema} 
        formMode={formMode}
        onModeChange={setFormMode}
        onValidate={() => setValidationTrigger(Date.now())}
        showDependencyInspector={showDependencyInspector}
        onToggleDependencyInspector={setShowDependencyInspector}
        showLookupInspector={showLookupInspector}
        onToggleLookupInspector={setShowLookupInspector}
        showPayloadPreview={showPayloadPreview}
        onTogglePayloadPreview={setShowPayloadPreview}
      />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', flexDirection: { xs: 'column', md: 'row' } }}>
        <PlaygroundSidebar selectedSchema={selectedSchema} onSelectSchema={setSelectedSchema} />
        <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.default' }}>
          <PlaygroundContent 
            selectedSchema={selectedSchema} 
            formMode={formMode} 
            validationTrigger={validationTrigger} 
            showDependencyInspector={showDependencyInspector} 
            showLookupInspector={showLookupInspector}
            showPayloadPreview={showPayloadPreview}
          />
        </Box>
      </Box>
    </Box>
  );
};
