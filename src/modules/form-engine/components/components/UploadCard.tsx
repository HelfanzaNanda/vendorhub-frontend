'use client';

import React, { useRef, useState } from 'react';

import { Box, Typography, CircularProgress, IconButton, Paper } from '@mui/material';
import { Delete, CloudUpload, InsertDriveFile, Download } from '@mui/icons-material';

export interface UploadCardProps {
  accept?: string;
  maxSize?: number; // in bytes
  maxCount?: number;
  loading?: boolean;
  progress?: number;
  file?: any; // the uploaded file data or File object
  isReadonly?: boolean;
  isDisabled?: boolean;
  onUpload: (files: File[]) => void;
  onDelete: () => void;
  onDownload: () => void;
  error?: string;
  label?: string;
  helperText?: string;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  accept, maxSize, maxCount = 1, loading, progress, file, isReadonly, isDisabled,
  onUpload, onDelete, onDownload, error, label, helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isReadonly && !isDisabled && !loading) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isReadonly || isDisabled || loading) return;
    
    const files = Array.from(e.dataTransfer.files);

    onUpload(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onUpload(Array.from(e.target.files));

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" gutterBottom color={error ? 'error' : 'textSecondary'}>
          {label}
        </Typography>
      )}
      
      {file && !loading ? (
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: error ? 'error.main' : 'divider' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <InsertDriveFile color="primary" />
            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }} title={file.name || file.fileName || 'Uploaded File'}>
              {file.name || file.fileName || 'Uploaded File'}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={onDownload} size="small" title="Download">
              <Download fontSize="small" />
            </IconButton>
            {!isReadonly && !isDisabled && (
              <IconButton onClick={onDelete} size="small" color="error" title="Delete">
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Paper>
      ) : (
        <Paper
          variant="outlined"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            p: 3,
            textAlign: 'center',
            cursor: isReadonly || isDisabled || loading ? 'default' : 'pointer',
            backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
            borderColor: error ? 'error.main' : (isDragOver ? 'primary.main' : 'divider'),
            borderStyle: 'double',
            opacity: isDisabled ? 0.6 : 1,
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => !isReadonly && !isDisabled && !loading && fileInputRef.current?.click()}
        >
          {loading ? (
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <CircularProgress variant={progress !== undefined ? 'determinate' : 'indeterminate'} value={progress} size={30} />
              <Typography variant="caption">{progress !== undefined ? `${Math.round(progress)}%` : 'Uploading...'}</Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <CloudUpload color={error ? 'error' : 'primary'} fontSize="large" />
              <Typography variant="body2" fontWeight="medium">
                Drag & Drop or click to upload
              </Typography>
              {accept && <Typography variant="caption" color="textSecondary">Accepts: {accept}</Typography>}
              {maxSize && <Typography variant="caption" color="textSecondary">Max size: {(maxSize / 1024 / 1024).toFixed(2)} MB</Typography>}
            </Box>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept={accept}
            multiple={maxCount > 1}
            onChange={handleFileChange}
          />
        </Paper>
      )}
      {(helperText || error) && (
        <Typography variant="caption" color={error ? 'error.main' : 'textSecondary'} sx={{ mt: 0.5, display: 'block' }}>
          {error || helperText}
        </Typography>
      )}
    </Box>
  );
};
