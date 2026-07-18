'use client';
import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';

import { Box, Typography, Alert } from '@mui/material';

interface Props {
  children: ReactNode;
  schemaId: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class SchemaErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Schema rendering error:', error, errorInfo);
  }
  
  public componentDidUpdate(prevProps: Props) {
    if (prevProps.schemaId !== this.props.schemaId) {
      this.setState({ hasError: false, errorMessage: '' });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error" variant="outlined">
            <Typography variant="subtitle1" fontWeight="bold">
              Unable to render schema.
            </Typography>
            <Typography variant="body2">
              {this.state.errorMessage}
            </Typography>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
