import React from 'react';

import { Box, Button } from '@mui/material';
import { useDynamicFormContext } from '../../context';

export const FormToolbar: React.FC = () => {
  const { reset, dirty, submitting } = useDynamicFormContext();
  
  return (
    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
      <Button 
        variant="outlined" 
        onClick={() => reset()} 
        disabled={submitting || !dirty}
      >
        Reset
      </Button>
      <Button 
        type="submit" 
        variant="contained" 
        disabled={submitting}
      >
        {submitting ? 'Saving...' : 'Submit'}
      </Button>
    </Box>
  );
};
