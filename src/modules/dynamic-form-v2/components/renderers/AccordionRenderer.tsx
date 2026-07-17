import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SectionRendererProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const AccordionRenderer: React.FC<SectionRendererProps> = ({ title, description, children, defaultExpanded = true }) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 3 }} variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <Typography variant="h6">{title || 'Section'}</Typography>
          {description && <Typography variant="body2" color="textSecondary">{description}</Typography>}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
