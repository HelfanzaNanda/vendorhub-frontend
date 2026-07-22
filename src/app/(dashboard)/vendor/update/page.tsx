'use client'

import React, { Suspense, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/services/api'


import PageHeader from '@/components/shared/PageHeader'
import { useAuthStore } from '@/features/auth/store'
import { DynamicForm } from '@/modules/form-engine'
import { LocalVendorSchema } from '@/modules/vendors/vendor/local/schemas/vendor-local.schema'
import LayoutVendorHeader from '@/modules/vendors/shared/components/LayoutVendorHeader'
import { MainSchema } from '@/modules'
import { LayoutVendorNavbar } from '@/modules/vendors/shared/components'

import { SaveCompanyButton } from '@/modules/vendors/vendor/local/schemas/vendor-company.schema'
import { SaveBusinessLicenseButton } from '@/modules/vendors/vendor/local/schemas/vendor-competency.schema'
import { SaveDocumentButton } from '@/modules/vendors/vendor/local/schemas/vendor-document.schema'

function UpdateVendorPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.user)
    // const isPreReg = user?.type === 'EXTERNAL' && user?.vendor?.vendorStatus?.code === 'PRE_REGISTRATION'
    // const activeTab = isPreReg ? 'terms_conditions' : (searchParams.get('tab') || 'terms_conditions')



    // MOCK: Default Vendor Type to LOCAL until API is integrated
    const vendorType = 'LOCAL'

    const getSchemaByVendorType = (type: string) => {
        switch (type) {
            //   case 'FOREIGN':
            //     return ForeignVendorSchema
            //   case 'INDIVIDUAL':
            //     return IndividualVendorSchema
            case 'LOCAL':
            default:
                return LocalVendorSchema
        }
    }

    const [formData, setFormData] = React.useState<Record<string, unknown>>({});


    const schemas = getSchemaByVendorType(vendorType)

    const [selectedSchema, setSelectedSchema] = useState<MainSchema>(schemas[0]);

    const tab = searchParams.get('tab');

    useEffect(() => {
        if (!tab) {
            router.replace(`/vendor/update?tab=${schemas[0].id}`, {
            scroll: false,
            });
            return;
        }

        const schema = schemas.find(s => s.id === tab);

        if (schema) {
            setSelectedSchema(schema);
        }
    }, [tab, schemas, router]);


    const handleSelectSchema = (schema: MainSchema) => {
        setSelectedSchema(schema)
        router.push(`/vendor/update?tab=${schema.id}`, { scroll: false })
    }

    const submitRegistrationMutation = useMutation({
        mutationFn: async () => {
            return await api.post('/vendor-update/submit')
        },
        onSuccess: (res: any) => {
            toast.success(res?.message || 'Vendor Update submitted successfully')
            queryClient.invalidateQueries()
            router.push('/dashboard')
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || error?.message || 'Failed to submit update'

            toast.error(message)
        }
    })

    return (
        <Box className="flex flex-col gap-6 p-4 h-full">
            <LayoutVendorHeader
                title="Update Vendor Profile"
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Vendor' },
                    { label: 'Update Profile' },
                ]}
                actionLabel={'Submit'}
                actionIcon={submitRegistrationMutation.isPending ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-send-plane-fill" />}
                onActionClick={() => submitRegistrationMutation.mutate()}
                actionDisabled={submitRegistrationMutation.isPending}
            />
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box className="flex flex-col w-full h-full">
                    <LayoutVendorNavbar
                        schemas={schemas}
                        selectedSchema={selectedSchema}
                        onSelectSchema={handleSelectSchema}
                    />
                    <Box className="min-h-[500px] flex flex-col gap-6">
                        <DynamicForm
                            key={selectedSchema.id}
                            schema={selectedSchema.schema}
                        >
                            {selectedSchema.id === 'vendor-company' && <SaveCompanyButton />}
                            {selectedSchema.id === 'vendor-capability' && <SaveBusinessLicenseButton />}
                            {selectedSchema.id === 'vendor-document' && <SaveDocumentButton />}
                        </DynamicForm>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default function UpdateVendorPage() {
    return (
        <Suspense fallback={null}>
            <UpdateVendorPageContent />
        </Suspense>
    )
}
