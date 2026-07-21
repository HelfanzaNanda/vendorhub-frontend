import React from 'react';

import { Chip } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import type { VerificationState } from '../../interfaces';

interface VerificationStatusProps {
  state: VerificationState;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({ state }) => {
  if (state.loading) {
    return <Chip label="Verifying..." color="default" size="small" />;
  }
  
  if (state.verified) {
    return <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" />;
  }

  if (state.message) {
    return <Chip icon={<CancelIcon />} label={state.message} color="error" size="small" />;
  }

  return <Chip label="Unverified" color="warning" size="small" />;
};
