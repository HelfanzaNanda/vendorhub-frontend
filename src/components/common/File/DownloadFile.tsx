import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import { apiClient } from '@/services/api';

export default function DownloadFile({ url, fileName }: { url: string, fileName: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // Simulasi fetch file dari API
      const response = await apiClient.get(url, { responseType: 'blob' });
      const blob = response.data;
      
      // Membuat URL temporer untuk blob
      const objectUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');

      link.href = objectUrl;
      link.setAttribute('download', fileName);
      
      // Memicu unduhan
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleDownload}
      size='small'
      disabled={loading}
      startIcon={loading ? <CircularProgress /> : <DownloadIcon />}
    >
      {loading ? 'Mengunduh...' : fileName}
    </Button>
  );
}
