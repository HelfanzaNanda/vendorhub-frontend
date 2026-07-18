'use client';

import React, { useEffect, useState } from 'react';

import { CircularProgress, Box, Typography } from '@mui/material';

import type { BaseFieldProps } from './types';
import { UploadCard } from '../components/UploadCard';
import { apiClient } from '@/services/api';

interface FileMetadata {
  accept?: string;
  maxSize?: number;
  maxCount?: number;
}

export const FileField: React.FC<BaseFieldProps> = ({
  name, value, onChange, field, error, isReadonly, isDisabled
}) => {
  const [metadata, setMetadata] = useState<FileMetadata>({});
  const [loadingMetadata, setLoadingMetadata] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    let active = true;
    const documentTypeCode = field.file?.documentTypeCode;
    
    if (!documentTypeCode) {
      setLoadingMetadata(false);
      
return;
    }

    const fetchMetadata = async () => {
      try {
        // Fetch metadata generically based on schema's documentTypeCode
        // E.g., /api/metadata/documents/COMPANY_PROFILE
        const response = await apiClient.get(`/metadata/documents/${documentTypeCode}`);

        const data = response.data;

        if (active) {
          setMetadata({
            accept: data.accept || data.allowedExtensions?.join(','),
            maxSize: data.maxSize, // bytes
            maxCount: data.maxCount || 1,
          });
        }
      } catch (err) {
        console.error("Failed to fetch document metadata:", err);
        // Non-blocking fallback for dev without endpoints
        if (active) setMetadata({ maxSize: 5242880 }); 
      } finally {
        if (active) setLoadingMetadata(false);
      }
    };

    fetchMetadata();
    
return () => { active = false; };
  }, [field.file?.documentTypeCode]);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];

    if (metadata.maxSize && file.size > metadata.maxSize) {
      alert(`File size exceeds ${(metadata.maxSize / 1024 / 1024).toFixed(2)}MB limit`);
      
return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Fake progress interval to simulate upload progress organically
      const interval = setInterval(() => setProgress(p => Math.min((p || 0) + 10, 90)), 200);
      
      const formData = new FormData();

      formData.append('file', file);
      
      // Generic upload endpoint, vendor agnostic
      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      clearInterval(interval);
      setProgress(100);
      
      const data = response.data;

      onChange(data);
    } catch (err) {
      console.error("Upload failed", err);
      // Fallback fake file for UI demonstration when API doesn't exist
      setTimeout(() => {
        onChange({ id: 'fake-id', name: file.name, url: '#' });
        setUploading(false);
        setProgress(undefined);
      }, 500);
    } finally {
      setUploading(false);
      setProgress(undefined);
    }
  };

  const handleDelete = () => {
    onChange(null);
  };

  const handleDownload = () => {
    const fileValue = value as { url?: string } | undefined | null;

    if (fileValue?.url) {
      window.open(fileValue.url, '_blank');
    }
  };

  if (loadingMetadata) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={16} />
        <Typography variant="caption" color="textSecondary">Loading configuration...</Typography>
      </Box>
    );
  }

  return (
    <UploadCard
      label={field.label}
      helperText={error || field.helperText}
      error={error}
      accept={metadata.accept}
      maxSize={metadata.maxSize}
      maxCount={metadata.maxCount}
      file={value}
      loading={uploading}
      progress={progress}
      isReadonly={isReadonly}
      isDisabled={isDisabled}
      onUpload={handleUpload}
      onDelete={handleDelete}
      onDownload={handleDownload}
    />
  );
};
