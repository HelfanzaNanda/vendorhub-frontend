import React, { useState } from 'react';

import { Card, CardContent, Typography, Box, IconButton, LinearProgress, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// 1. Custom Styling untuk Card agar terlihat modern & smooth
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 12,
    boxShadow: 'none',
    border: '1px solid #eef2f6',
    transition: 'all 0.3s ease-in-out',
    maxWidth: 400,
    backgroundColor: '#fafafa',
    '&:hover': {
        borderColor: '#90caf9',
        backgroundColor: '#fff',
    },
}));

// Custom Avatar untuk Icon File
const FileAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: '#e3f2fd',
    color: '#1e88e5',
    width: 48,
    height: 48,
    borderRadius: 10,
}));

interface PremiumDownloadCardProps {
  url: string;
  fileName: string;
}

export default function PremiumDownloadCard({ url, fileName }: PremiumDownloadCardProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // 'idle' | 'downloading' | 'completed'

  const startDownload = async () => {
    if (status === 'completed') return;
    
    setStatus('downloading');
    setProgress(0);

    // Simulasi progress bar berjalan (bisa diganti dengan axios onDownloadProgress)
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         const diff = Math.random() * 15;

        
// return Math.min(oldProgress + diff, 90); // Stop at 90% until fetch finishes
//       });
//     }, 300);

    const timer = undefined;

    try {
      const response = await fetch(url || 'https://api.example.com/download-report');
      const blob = await response.blob();
      
      clearInterval(timer);
      setProgress(100);
      setStatus('completed');

      const objectUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');

      link.href = objectUrl;
      link.setAttribute('download', fileName || 'download');
      
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
      
      // Reset status after a few seconds
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 3000);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
      clearInterval(timer);
      setStatus('idle');
    }
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Icon File Bagian Kiri */}
          <FileAvatar variant="rounded">
            <InsertDriveFileIcon />
          </FileAvatar>

          {/* Detail Info File */}
          <Box flexGrow={1} sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight="600" color="text.primary" noWrap title={fileName}>
              {fileName || 'Unknown File'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Attachment
            </Typography>
          </Box>

          {/* Tombol Aksi Kanan */}
          <Box>
            {status === 'completed' ? (
              <IconButton color="success" disabled sx={{ backgroundColor: '#e8f5e9' }}>
                <CheckCircleIcon />
              </IconButton>
            ) : (
              <IconButton 
                color="primary" 
                onClick={startDownload}
                disabled={status === 'downloading'}
                sx={{ 
                  backgroundColor: '#f5f5f5', 
                  '&:hover': { backgroundColor: '#1e88e5', color: '#fff' } 
                }}
              >
                <DownloadIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Indikator Progress Animasi di Bagian Bawah */}
        {status === 'downloading' && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="primary" fontWeight="600">
                Mengunduh...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 4, 
                borderRadius: 2,
                backgroundColor: '#eef2f6',
                '& .MuiLinearProgress-bar': { borderRadius: 2 }
              }} 
            />
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
}
