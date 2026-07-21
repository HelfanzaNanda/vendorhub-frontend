import React from 'react';

import { Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Chip } from '@mui/material';

import { createPortal } from 'react-dom';

import { useDynamicFormContext } from '@/modules/form-engine';

export const ValidationSummaryPortal: React.FC<{ trigger: number }> = ({ trigger }) => {
  const context = useDynamicFormContext();
  const [hasValidated, setHasValidated] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setTarget(document.getElementById('validation-summary-target'));
  }, []);

  React.useEffect(() => {
    if (trigger > 0) {
      if ((context.mode as string) !== 'DISABLED') {
        context.validate();
      }

      setHasValidated(true);
    }
  }, [trigger]);

  if (!hasValidated || (context.mode as string) === 'DISABLED' || !target) return null;

  const errorEntries = Object.entries(context.errors || {});

  const getFieldLabel = (path: string): string => {
    const lastPart = path.split('.').pop()?.replace(/\[\d+\]/g, '') || path;

    
return lastPart.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const handleScrollToField = (field: string) => {
    const el = document.querySelector(`[name="${field}"]`) || document.getElementById(field);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (el as HTMLElement).focus?.();
    }
  };

  return createPortal(
    <Accordion sx={{ mb: 3 }} defaultExpanded>
      <AccordionSummary expandIcon={<span>▼</span>}>
        <Typography fontWeight="bold">Validation Summary</Typography>
        {errorEntries.length > 0 && (
          <Chip size="small" color="error" label={`${errorEntries.length} Errors`} sx={{ ml: 2 }} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        {errorEntries.length === 0 ? (
          <Typography color="success.main">No validation errors.</Typography>
        ) : (
          <List dense sx={{ width: '100%', p: 0 }}>
            {errorEntries.map(([field, message]) => (
              <ListItem 
                key={field} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  mb: 1, 
                  borderRadius: 1, 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }} 
                onClick={() => handleScrollToField(field)}
              >
                <ListItemText 
                  primary={getFieldLabel(field)} 
                  secondary={
                    <Typography variant="body2" color="error.main">
                      {message as string}
                    </Typography>
                  } 
                />
              </ListItem>
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>,
    target
  );
};
