'use client';
import React from 'react';

import { Box, Card, CardContent, Typography, Divider, Button, Stack, Grid } from '@mui/material';

import type { PlaygroundSchema} from '../registry';
import { DynamicForm } from '@/modules/dynamic-form-v2';
import { SchemaErrorBoundary } from './SchemaErrorBoundary';
import { generateMockData } from '../mock';

import { ValidationSummaryPortal } from './ValidationSummary';
import { DependencyInspectorPortal } from './DependencyInspector';
import { LookupInspectorPortal } from './LookupInspector';
import { PayloadPreviewPortal } from './PayloadPreview';

interface PlaygroundContentProps {
  selectedSchema: PlaygroundSchema | null;
  formMode: string;
  validationTrigger: number;
  showDependencyInspector: boolean;
  showLookupInspector: boolean;
  showPayloadPreview: boolean;
}



export const PlaygroundContent: React.FC<PlaygroundContentProps> = ({ selectedSchema, formMode, validationTrigger, showDependencyInspector, showLookupInspector, showPayloadPreview }) => {
  const [formData, setFormData] = React.useState<Record<string, unknown>>({});

  React.useEffect(() => {
    setFormData({});
  }, [selectedSchema?.id]);

  const handleLoadMock = () => {
    if (selectedSchema) {
      setFormData(generateMockData(selectedSchema.schema));
    }
  };

  const handleReset = () => {
    setFormData({});
  };

  if (!selectedSchema) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant="h6" color="text.secondary">
          No schemas registered.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Box id="validation-summary-target" sx={{ maxWidth: 1200, width: '100%', order: { xs: 3, md: 1 } }} />
      <Box id="dependency-inspector-target" sx={{ maxWidth: 1200, width: '100%', order: { xs: 4, md: 2 } }} />
      <Box id="lookup-inspector-target" sx={{ maxWidth: 1200, width: '100%', order: { xs: 5, md: 3 } }} />
      
      <Grid container spacing={3} sx={{ maxWidth: showPayloadPreview ? 1600 : 1200, width: '100%', order: { xs: 1, md: 4 }, mb: { xs: 3, md: 0 } }}>
        <Grid item xs={12} md={showPayloadPreview ? 8 : 12}>
          <Card sx={{ width: '100%', boxShadow: 1 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'flex-start' }, gap: 2 }}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedSchema.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {selectedSchema.description}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <Button variant="outlined" color="primary" onClick={handleLoadMock} sx={{ flexGrow: 1 }}>
                    Load Mock Data
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ flexGrow: 1 }}>
                    Reset
                  </Button>
                </Stack>
              </Box>
              <Divider sx={{ my: 3 }} />
              
              <SchemaErrorBoundary schemaId={selectedSchema.id}>
                <DynamicForm
                    key={selectedSchema.id}
                  schema={selectedSchema.schema}
                  mode={formMode as 'CREATE' | 'EDIT' | 'VIEW'}
                  initialValues={formData}
                >
                  <ValidationSummaryPortal key="validation" trigger={validationTrigger} />
                  <DependencyInspectorPortal key="dependency" active={showDependencyInspector} />
                  <LookupInspectorPortal key="lookup" active={showLookupInspector} />
                  {showPayloadPreview ? <PayloadPreviewPortal key="payload" /> : null}
                </DynamicForm>
              </SchemaErrorBoundary>
            </CardContent>
          </Card>
        </Grid>
        
        {showPayloadPreview && (
          <Grid item xs={12} md={4}>
            <Box id="payload-preview-target" sx={{ width: '100%', position: 'sticky', top: 24 }} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
