import React from 'react';
import { Alert, Typography } from '@mui/material';

export function TermsAlert() {
  return (
    <Alert severity="info">
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Before you can proceed with the vendor registration, please complete the following steps:
      </Typography>
      <ol className="list-decimal pl-5 space-y-1 mt-2">
        <li>Fill in all required information.</li>
        <li>Check <strong>&quot;I have read and understood all Terms &amp; Conditions.&quot;</strong></li>
        <li>Download the Terms &amp; Conditions document.</li>
        <li>Sign the downloaded document.</li>
        <li>Upload the signed document.</li>
        <li>Click <strong>Submit Terms &amp; Conditions</strong>.</li>
      </ol>
    </Alert>
  );
}
