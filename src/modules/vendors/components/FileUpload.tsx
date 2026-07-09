'use client'

import React, { useState, useRef } from 'react'

import { 
  Box, Typography, Button, IconButton, LinearProgress, CircularProgress
} from '@mui/material'
import { toast } from 'sonner'

import { fileService, type FileData } from '@/services/file.service'

interface FileUploadProps {
  value?: FileData | null
  onChange: (file: FileData | null) => void
  onBlur?: () => void
  disabled?: boolean
  error?: boolean
  helperText?: string
  accept?: string
}

export default function FileUpload({
  value,
  onChange,
  onBlur,
  disabled,
  error,
  accept = 'application/pdf,image/jpeg,image/png'
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setIsUploading(true)
    setProgress(0)

    try {
      const response = await fileService.upload(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size))

        setProgress(percentCompleted)
      })

      if (response.data) {
        onChange(response.data)
        toast.success('File uploaded successfully')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to upload file')

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = () => {
    onChange(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatSize = (bytes?: number) => {
    if (!bytes) return ''
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Box className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        style={{ display: 'none' }}
        disabled={disabled || isUploading}
        onBlur={onBlur}
      />
      
      {!value && !isUploading && (
        <Box 
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors
            ${error ? 'border-error bg-error/5' : 'border-gray-300 hover:border-primary bg-zinc-50 dark:border-gray-700 dark:bg-zinc-900/50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2" />
          <Typography variant="body1" fontWeight="medium">
            Click to upload document
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PDF, JPG, PNG up to 5MB
          </Typography>
        </Box>
      )}

      {isUploading && (
        <Box className="flex flex-col p-4 border rounded-md border-gray-300 bg-zinc-50 dark:border-gray-700 dark:bg-zinc-900/50">
          <Box className="flex items-center gap-3 mb-2">
            <CircularProgress size={24} />
            <Typography variant="body2">Uploading...</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}

      {value && !isUploading && (
        <Box 
          className={`flex items-center justify-between p-4 border rounded-md bg-zinc-50 dark:bg-zinc-900/50 
            ${error ? 'border-error' : 'border-gray-300 dark:border-gray-700'}
          `}
        >
          <Box className="flex items-center gap-3 overflow-hidden">
            <i className="ri-file-text-line text-3xl text-primary flex-shrink-0" />
            <Box className="overflow-hidden">
              <Typography variant="body2" fontWeight="semibold" className="truncate" title={value.filename || value.originalname}>
                {value.filename || value.originalname || 'Document'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatSize(value.size)}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-1 flex-shrink-0">
            {value.path && (
              <IconButton 
                size="small" 
                color="primary" 
                title="Download"
                onClick={() => window.open(value.path.startsWith('http') ? value.path : `${process.env.NEXT_PUBLIC_API_URL}/${value.path}`, '_blank')}
              >
                <i className="ri-download-line" />
              </IconButton>
            )}
            {!disabled && (
              <IconButton 
                size="small" 
                color="error" 
                onClick={handleRemove}
                title="Remove"
              >
                <i className="ri-delete-bin-line" />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
