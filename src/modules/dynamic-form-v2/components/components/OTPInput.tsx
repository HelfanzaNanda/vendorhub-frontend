import type { KeyboardEvent, ClipboardEvent } from 'react';
import React, { useState, useRef, useEffect } from 'react';

import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

import { VerificationEngine } from '../../engines';
import type { VerificationState } from '../../interfaces';

interface OTPInputProps {
  length?: number;
  onVerify: (otp: string) => Promise<boolean>;
  onResend: () => Promise<void>;
  onStatusChange?: (state: VerificationState) => void;
  helperText?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6, onVerify, onResend, onStatusChange, helperText
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(60);
  const [state, setState] = useState<VerificationState>(VerificationEngine.reset());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);

      
return () => clearTimeout(timer);
    }
  }, [countdown]);

  const updateState = (newState: VerificationState) => {
    setState(newState);
    if (onStatusChange) onStatusChange(newState);
  };

  const handleResend = async () => {
    updateState(VerificationEngine.markLoading());

    try {
      await onResend();
      setCountdown(60);
      updateState(VerificationEngine.reset());
      setOtp(new Array(length).fill(''));
      inputRefs.current[0]?.focus();
    } catch (e) {
      updateState(VerificationEngine.markUnverified('Failed to resend'));
    }
  };

  const submitOtp = async (code: string) => {
    updateState(VerificationEngine.markLoading());

    try {
      const success = await onVerify(code);

      if (success) {
        updateState(VerificationEngine.markVerified('OTP Verified Successfully'));
      } else {
        updateState(VerificationEngine.markUnverified('Invalid OTP Code'));
      }
    } catch (e) {
      updateState(VerificationEngine.markUnverified('System Error'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');

    if (!val) return;
    
    const newOtp = [...otp];

    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    if (index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    const currentOtp = newOtp.join('');

    if (currentOtp.length === length) {
      submitOtp(currentOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, length);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split('').forEach((char, idx) => {
      newOtp[idx] = char;
    });
    setOtp(newOtp);
    
    const focusIndex = Math.min(pastedData.length, length - 1);

    setActiveInput(focusIndex);
    inputRefs.current[focusIndex]?.focus();

    if (pastedData.length === length) {
      submitOtp(pastedData);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>Enter OTP</Typography>
      <Box display="flex" gap={1} mb={2}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={el => inputRefs.current[index] = el}
            value={digit}
            onChange={e => handleChange(e as any, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => setActiveInput(index)}
            disabled={state.loading || state.verified}
            autoFocus={index === 0}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '1.25rem', padding: '12px' },
              inputMode: 'numeric'
            }}
            sx={{ width: '3rem' }}
          />
        ))}
      </Box>

      {state.loading && <CircularProgress size={20} sx={{ mb: 1, display: 'block' }} />}
      
      {state.message && (
        <Typography color={state.verified ? 'success.main' : 'error.main'} variant="body2" mb={1}>
          {state.message}
        </Typography>
      )}

      {helperText && !state.message && (
        <Typography color="textSecondary" variant="caption" display="block" mb={1}>
          {helperText}
        </Typography>
      )}

      {!state.verified && (
        <Box display="flex" alignItems="center" gap={1}>
          <Button 
            variant="text" 
            size="small" 
            disabled={countdown > 0 || state.loading}
            onClick={handleResend}
          >
            Resend OTP
          </Button>
          {countdown > 0 && (
            <Typography variant="caption" color="textSecondary">
              Wait {countdown}s
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
