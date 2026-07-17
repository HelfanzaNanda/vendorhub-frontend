import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { VerificationEngine } from '../../engine';
import { VerificationState, VerificationSchema } from '../../interfaces';

interface VerificationButtonProps {
  schema: VerificationSchema;
  value: string;
  onVerifyStatusChange: (state: VerificationState) => void;
  disabled?: boolean;
}

export const VerificationButton: React.FC<VerificationButtonProps> = ({
  schema, value, onVerifyStatusChange, disabled
}) => {
  const [state, setState] = useState<VerificationState>(VerificationEngine.reset());

  const handleVerify = async () => {
    if (!value) return;

    const loadingState = VerificationEngine.markLoading();
    setState(loadingState);
    onVerifyStatusChange(loadingState);

    try {
      // Execute verify based on schema action (e.g. CHECK_EMAIL, VERIFY_PRIVY)
      // This is a generic mockup. Real implementation injects standard api calls.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let nextState;
      if (schema.otp) {
        // Only requested OTP, not strictly verified yet
        nextState = VerificationEngine.reset();
        // Typically a custom state/flag might be emitted here to toggle OTP visibility in parent
      } else {
        nextState = VerificationEngine.markVerified('Verification Successful');
      }
      
      setState(nextState);
      onVerifyStatusChange(nextState);
    } catch (err) {
      const errorState = VerificationEngine.markUnverified('Verification Failed');
      setState(errorState);
      onVerifyStatusChange(errorState);
    }
  };

  if (state.verified) {
    return (
      <Button variant="outlined" color="success" disabled sx={{ mt: 1 }}>
        Verified
      </Button>
    );
  }

  return (
    <Button 
      variant="contained" 
      onClick={handleVerify} 
      disabled={disabled || state.loading || !value}
      startIcon={state.loading && <CircularProgress size={16} color="inherit" />}
      sx={{ mt: 1 }}
    >
      {state.loading ? 'Verifying...' : 'Verify'}
    </Button>
  );
};
