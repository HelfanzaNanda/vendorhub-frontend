import React from 'react';
import { Box, Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const FormToolbar: React.FC = () => {
  const { formState: { isSubmitting, isDirty }, reset } = useFormContext();
  
  return (
    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
      <Button 
        variant="outlined" 
        onClick={() => reset()} 
        disabled={isSubmitting || !isDirty}
      >
        Reset
      </Button>
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Submit'}
      </Button>
    </Box>
  );
};
