import React from 'react';
import { SectionSchema } from '../../interfaces';
import { DynamicController } from './DynamicController';
import { FormLayout } from '../../enums';
import { CardRenderer, AccordionRenderer } from '../renderers';
import { Box, Typography } from '@mui/material';

interface DynamicSectionProps {
  section: SectionSchema;
  namePrefix?: string;
}

export const DynamicSection: React.FC<DynamicSectionProps> = ({ section, namePrefix }) => {
  
  const renderFields = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {section.fields.map(field => (
        <DynamicController key={field.id} field={field} namePrefix={namePrefix} />
      ))}
    </Box>
  );

  switch (section.layout) {
    case FormLayout.CARD:
      return (
        <CardRenderer title={section.title} description={section.description}>
          {renderFields()}
        </CardRenderer>
      );
      
    case FormLayout.ACCORDION:
      return (
        <AccordionRenderer title={section.title} description={section.description}>
          {renderFields()}
        </AccordionRenderer>
      );
      
    case FormLayout.TABLE:
    case FormLayout.TABS:
    case FormLayout.STEPPER:
    default:
      return (
        <Box mb={3}>
          {section.title && <Typography variant="h6" gutterBottom>{section.title}</Typography>}
          {section.description && <Typography variant="body2" color="textSecondary" gutterBottom>{section.description}</Typography>}
          {renderFields()}
        </Box>
      );
  }
};
