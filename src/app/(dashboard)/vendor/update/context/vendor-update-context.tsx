'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Box, CircularProgress, Typography } from '@mui/material';

export interface VendorUpdatePermission {
    canSave: boolean;
    canSubmit: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

export interface VendorUpdateVerification {
    expiredAt?: string;
    remainingDays?: number;
    message?: string;
}

export interface VendorUpdateInfo {
    vendorId: number;
    vendorType: string;
}

export interface VendorUpdateContextData {
    info: VendorUpdateInfo;
    permission: VendorUpdatePermission;
    verification?: VendorUpdateVerification;
}

export interface VendorUpdateContextValue {
    data: VendorUpdateContextData;
    isLoading: boolean;
    error: any;
}

const VendorUpdateContext = createContext<VendorUpdateContextValue | undefined>(undefined);

export const useVendorUpdateContext = () => {
    const context = useContext(VendorUpdateContext);
    if (context === undefined) {
        throw new Error('useVendorUpdateContext must be used within a VendorUpdateProvider');
    }
    return context;
};

interface VendorUpdateProviderProps {
    children: ReactNode;
}

export const VendorUpdateProvider: React.FC<VendorUpdateProviderProps> = ({ children }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['vendor-update-context'],
        queryFn: async () => {
            const response = await api.get('/vendor-update/context');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    if (isLoading) {
        return (
            <Box className="flex flex-col items-center justify-center h-full p-8">
                <CircularProgress />
                <Typography className="mt-4 text-gray-500">Loading vendor context...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex flex-col items-center justify-center h-full p-8">
                <Typography color="error">Failed to load vendor context. Please try again later.</Typography>
            </Box>
        );
    }

    const value: VendorUpdateContextValue = {
        data: data,
        isLoading,
        error,
    };

    return (
        <VendorUpdateContext.Provider value={value}>
            {children}
        </VendorUpdateContext.Provider>
    );
};
