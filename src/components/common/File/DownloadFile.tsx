import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';

export default function DownloadFile({ url, fileName }: { url: string, fileName: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // Simulasi fetch file dari API
      const response = await fetch('https://api.example.com/download-report');
      const blob = await response.blob();
      
      // Membuat URL temporer untuk blob
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', fileName);
      
      // Memicu unduhan
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
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
