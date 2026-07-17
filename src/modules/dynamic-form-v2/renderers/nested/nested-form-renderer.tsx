import React from 'react';

import { Box, Button, Typography, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import { FormRenderer } from '../form';
import { useNestedForm } from '../../hooks';
import type { NestedFormRendererProps } from './nested-form-renderer.interface';

export const NestedFormRenderer: React.FC<NestedFormRendererProps> = React.memo((props) => {
  const { field } = props;
  
  const {
    items,
    schema,
    multiple: isMultiple,
    add,
    remove
  } = useNestedForm({ field });

  if (!schema) {
    return <Typography color="textSecondary" variant="body2">Loading nested schema for {field.name}...</Typography>;
  }

  if (isMultiple) {
    const itemsArray = items as any[];
    
    return (
      <Box sx={{ mb: 2 }}>
        {itemsArray.length === 0 ? (
          <Box sx={{ p: 3, border: '1px dashed', borderColor: 'divider', textAlign: 'center', borderRadius: 1, mb: 2 }}>
            <Typography color="textSecondary" sx={{ mb: 1 }}>Empty Data</Typography>
            <Button variant="outlined" startIcon={<Add />} onClick={() => add()}>
              Add {schema.title || 'Item'}
            </Button>
          </Box>
        ) : (
          <Box>
            {itemsArray.map((_item, index) => (
              <Box key={index} sx={{ mb: 3, position: 'relative', border: '1px solid', borderColor: 'divider', p: 2, borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <IconButton color="error" onClick={() => remove(index)} size="small">
                    <Delete />
                  </IconButton>
                </Box>
                <FormRenderer schema={schema} />
              </Box>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={() => add()} sx={{ mt: 1 }}>
              Add {schema.title || 'Item'}
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <FormRenderer schema={schema} />
    </Box>
  );
});

NestedFormRenderer.displayName = 'NestedFormRenderer';
