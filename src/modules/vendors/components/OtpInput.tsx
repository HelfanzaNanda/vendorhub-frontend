'use client'

import React, { useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { Box } from '@mui/material'

interface OtpInputProps {
    value: string
    onChange: (val: string) => void
    length?: number
    disabled?: boolean
}

export default function OtpInput({ value, onChange, length = 6, disabled = false }: OtpInputProps) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value
        if (!/^[0-9]*$/.test(val)) return

        const newChar = val.slice(-1)
        
        let newValue = value.split('')
        newValue[index] = newChar
        const updatedValue = newValue.join('')
        
        onChange(updatedValue.substring(0, length))

        if (newChar && index < length - 1) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (!value[index] && index > 0) {
                inputsRef.current[index - 1]?.focus()
            }
            
            let newValue = value.split('')
            newValue[index] = ''
            onChange(newValue.join(''))
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length).replace(/[^0-9]/g, '')
        if (pastedData) {
            let newValue = value.split('')
            for (let i = 0; i < pastedData.length; i++) {
                if (i < length) {
                    newValue[i] = pastedData[i]
                }
            }
            onChange(newValue.join('').substring(0, length))
            
            const focusIndex = Math.min(pastedData.length, length - 1)
            inputsRef.current[focusIndex]?.focus()
        }
    }

    return (
        <Box className="flex gap-2 items-center">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => { inputsRef.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className="w-10 h-10 text-center text-lg font-medium border-2 rounded-md focus:border-primary-500 focus:outline-none transition-colors dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 disabled:opacity-50"
                />
            ))}
        </Box>
    )
}
