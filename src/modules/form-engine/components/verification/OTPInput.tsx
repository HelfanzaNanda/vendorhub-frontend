"use client"

import React, { useRef, useEffect } from 'react';
import { Box, InputBase } from '@mui/material';

interface OTPInputProps {
    value: string;
    length?: number;
    disabled?: boolean;
    onChange: (value: string) => void;
    onComplete: (value: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
    value,
    length = 6,
    disabled = false,
    onChange,
    onComplete
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const otp = Array.from({ length }, (_, i) => value[i] || "");

    useEffect(() => {
        if (!disabled) {
            inputRefs.current[0]?.focus();
        }
    }, [disabled]);

    const focusInput = (index: number) => {
        if (index >= 0 && index < length) {
            inputRefs.current[index]?.focus();
            inputRefs.current[index]?.select();
        }
    };

    const handleChange = (index: number, digit: string) => {
        const chars = [...otp];
        chars[index] = digit.replace(/\D/g, "").slice(-1);
        
        const code = chars.join("").trimEnd();
        onChange(code);

        if (digit && index < length - 1) {
            focusInput(index + 1);
        }

        if (code.length === length && !code.includes(" ")) {
            onComplete(code);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const chars = [...otp];
            if (chars[index]) {
                chars[index] = "";
                onChange(chars.join("").trimEnd());
            } else if (index > 0) {
                focusInput(index - 1);
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            focusInput(index - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (pasted) {
            onChange(pasted);
            if (pasted.length === length) {
                onComplete(pasted);
            }
            const nextIndex = Math.min(pasted.length, length - 1);
            focusInput(nextIndex);
        }
    };

    return (
        <Box display="flex" gap={1.5} justifyContent="center" width="100%">
            {otp.map((digit, index) => (
                <InputBase
                    key={index}
                    value={digit}
                    inputRef={(el) => { inputRefs.current[index] = el; }}
                    disabled={disabled}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e as any)}
                    onPaste={(e) => handlePaste(e as any)}
                    inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                        pattern: "[0-9]*"
                    }}
                    sx={{
                        width: 56,
                        height: 64,
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: digit ? 'primary.main' : 'divider',
                        transition: 'all 0.2s',
                        '& input': {
                            textAlign: 'center',
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: 'text.primary',
                            p: 0,
                            height: '100%'
                        },
                        '&:focus-within': {
                            borderColor: 'primary.main',
                            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                        }
                    }}
                />
            ))}
        </Box>
    );
};
