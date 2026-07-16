import React from 'react';

import { Box, Typography, Chip, Grid, alpha, useTheme } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import type { WorklistFieldSchema } from '../schemas/types';
import GenericFieldRenderer from './GenericFieldRenderer';

interface WorklistCustomerReferenceTableProps {
  value: any[];
  field: WorklistFieldSchema;
  originalValue?: any;
}

export default function WorklistCustomerReferenceTable({ value = [], field, originalValue }: WorklistCustomerReferenceTableProps) {
  const theme = useTheme();

  if (!value || value.length === 0) {
    return <Typography variant="body2" color="text.secondary">No customer references found.</Typography>;
  }

  const renderFieldDiff = (label: string, oldVal: any, newVal: any, action: string) => {
    const isChanged = action === 'UPDATE' && String(oldVal) !== String(newVal);

    if (action === 'CREATE') {
      return (
        <Box mb={1}>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
          <Typography variant="body2">{newVal || '-'}</Typography>
        </Box>
      );
    }

    if (action === 'DELETE') {
      return (
        <Box mb={1} sx={{ opacity: 0.6, textDecoration: 'line-through' }}>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
          <Typography variant="body2">{oldVal || '-'}</Typography>
        </Box>
      );
    }

    if (isChanged) {
      return (
        <Box mb={1} p={1} borderRadius={1} sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), borderLeft: '2px solid', borderColor: 'warning.main' }}>
          <Typography variant="caption" fontWeight="bold" color="text.primary">{label}</Typography>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="body2" sx={{ opacity: 0.6, textDecoration: 'line-through' }}>{oldVal || '-'}</Typography>
            <ArrowForwardIcon sx={{ fontSize: 14, color: 'warning.main' }} />
            <Typography variant="body2" fontWeight="bold">{newVal || '-'}</Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box mb={1} sx={{ opacity: 0.8 }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body2">{newVal || '-'}</Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {value.map((row, index) => {
        const action = row.action || 'NO CHANGE';
        
        const badgeColor = 'default';
        let badgeBg = alpha(theme.palette.text.secondary, 0.1);
        let badgeText = 'text.secondary';
        
        if (action === 'CREATE') { badgeBg = alpha(theme.palette.success.main, 0.15); badgeText = 'success.main'; }
        if (action === 'UPDATE') { badgeBg = alpha(theme.palette.warning.main, 0.15); badgeText = 'warning.main'; }
        if (action === 'DELETE') { badgeBg = alpha(theme.palette.error.main, 0.15); badgeText = 'error.main'; }

        return (
          <Box key={index} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, bgcolor: 'background.paper' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Typography variant="subtitle2" fontWeight="bold">{row.name || `Reference ${index + 1}`}</Typography>
              <Box sx={{ px: 1.5, py: 0.5, bgcolor: badgeBg, color: badgeText, borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>
                {action === 'UPDATE' && '🟠 '}
                {action === 'CREATE' && '🟢 '}
                {action === 'DELETE' && '🔴 '}
                {action === 'NO CHANGE' && '⚪ '}
                {action}
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {renderFieldDiff('Project Name', row.originalData?.name || row.name, row.name, action)}
                {renderFieldDiff('Description', row.originalData?.description || row.description, row.description, action)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderFieldDiff('Project Value', row.originalData?.projectValue || row.projectValue, row.projectValue, action)}
                {renderFieldDiff('Year', row.originalData?.year || row.year, row.year, action)}
                {renderFieldDiff('Area', row.originalData?.areaIds || row.areaIds, row.areaIds, action)}
              </Grid>
              <Grid item xs={12}>
                {/* File Attachment Diff */}
                {renderFieldDiff('Attachment', row.originalData?.fileName || row.fileName, row.fileName, action)}
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
