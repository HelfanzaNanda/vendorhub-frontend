import React from 'react';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import type { LayoutComponentProps } from '../layout-renderer.interface';

export const AccordionLayout: React.FC<LayoutComponentProps> = ({ title, description, children, props }) => {
  const defaultExpanded = props?.defaultExpanded as boolean | undefined;

  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box>
          {title && <Typography variant="h6">{title}</Typography>}
          {description && <Typography variant="body2" color="textSecondary">{description}</Typography>}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
