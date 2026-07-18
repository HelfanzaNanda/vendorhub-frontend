"use client"

import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

interface StepItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface StepperRendererProps {
  items: StepItem[];
}

export const StepperRenderer: React.FC<StepperRendererProps> = ({ items }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {items.map((item) => (
          <Step key={item.id}>
            <StepLabel>{item.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mb: 4 }}>
        {items[activeStep]?.content}
      </Box>
      
      <Box display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep < items.length - 1 ? (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        ) : (
          <Box /> // Allows natural layout spacing
        )}
      </Box>
    </Box>
  );
};
