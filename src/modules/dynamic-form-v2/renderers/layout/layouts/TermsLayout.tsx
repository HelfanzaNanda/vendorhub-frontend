import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { TermsConditionsPage } from '@/modules/dynamic-form-v2/custom/terms';
import { useDynamicFormContext } from '@/modules/dynamic-form-v2/context';

export const TermsLayout: React.FC<any> = ({ props }) => {
    const context = useDynamicFormContext();
    
    const isReadOnly = context.readonly || context.mode === 'VIEW';

    const { data: masterTermsData, isLoading: isLoadingMaster } = useQuery({
        queryKey: ['master-terms-latest'],
        queryFn: async () => {
            const res = await apiClient.get('/terms-conditions/latest');
            return res.data.data;
        },
        retry: 1
    });
    
    const { data: vendorTermsDataFetched, isLoading: isLoadingVendor } = useQuery({
        queryKey: ['vendor-terms'],
        queryFn: async () => {
            try {
                const res = await apiClient.get('/vendor/terms-conditions');
                return res.data?.data || res.data || null;
            } catch (err: any) {
                if (err.response?.status === 404) return null;
                throw err;
            }
        },
        retry: 1
    });

    const masterTerms = masterTermsData || props?.masterTerms;
    const vendorTermsData = vendorTermsDataFetched || props?.vendorTermsData || {};

    const handleSubmit = (data: any) => {
        console.log('Terms Submitted:', data);
    };

    return (
        <TermsConditionsPage
            masterTerms={masterTerms}
            vendorTermsData={vendorTermsData}
            isReadOnly={isReadOnly}
            onSubmit={handleSubmit}
            user={{ firstname: 'Mock Vendor User' }}
            isLoading={isLoadingMaster || isLoadingVendor}
        />
    );
};
