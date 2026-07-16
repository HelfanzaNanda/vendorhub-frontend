import { z } from 'zod'

import type { FormSchema } from '../types'

const isBOD = (v: any) => v.personnelTypeCode === 'BOARD_OF_DIRECTORS'
const isSigner = (v: any) => v.personnelTypeCode === 'AUTHORIZED_SIGNER'
const isShareholder = (v: any) => v.personnelTypeCode === 'SHAREHOLDER'
const isShareholderPerson = (v: any) => isShareholder(v) && v.titleName !== 'Perusahaan'
const isShareholderCompany = (v: any) => isShareholder(v) && v.titleName === 'Perusahaan'

export const personnelModalSchema: FormSchema = {
    id: 'personnel_modal',
    title: 'Personnel Information',
    sections: [
        {
            id: 'personnel_details',
            title: 'Details',
            fields: [
                {
                    id: 'titleName',
                    name: 'titleName',
                    label: 'Title Name',
                    type: 'text',
                    visibility: () => false, // Hidden field to track the title name
                },
                {
                    id: 'titleId',
                    name: 'titleId',
                    label: 'Title',
                    type: 'autocomplete',
                    grid: { xs: 12, md: 6 },
                    lookupEndpoint: (v) => (isBOD(v) || isSigner(v)) ? 'titles?excludeCodes=PERUSAHAAN' : 'titles',
                    populateFields: { label: 'titleName' }
                },
                {
                    id: 'name',
                    name: 'name',
                    label: 'Full Name',
                    type: 'text',
                    required: true,
                    grid: { xs: 12, md: 6 }
                },
                {
                    id: 'jobTypeId',
                    name: 'jobTypeId',
                    label: 'Job Type',
                    type: 'select',
                    grid: { xs: 12, md: 6 },
                    lookupEndpoint: 'job-types',
                    visibility: (v) => isBOD(v) || isSigner(v)
                },
                {
                    id: 'position',
                    name: 'position',
                    label: 'Position',
                    type: 'text',
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isBOD(v) || isSigner(v) || isShareholderPerson(v)
                },
                {
                    id: 'identityTypeId',
                    name: 'identityTypeId',
                    label: 'Identity Type',
                    type: 'select',
                    grid: { xs: 12, md: 6 },
                    lookupEndpoint: 'identity-types',
                    visibility: (v) => isBOD(v) || isSigner(v) || isShareholderPerson(v)
                },
                {
                    id: 'identityNumber',
                    name: 'identityNumber',
                    label: 'Identity Number',
                    type: 'text',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isBOD(v) || isSigner(v) || isShareholderPerson(v)
                },
                {
                    id: 'email',
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    required: true,
                    validation: z.string().email('Invalid email address').optional().or(z.literal('')),
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isBOD(v) || isSigner(v),
                    verification: [{
                        id: 'check-email',
                        type: 'VERIFY_EMAIL',
                        endpoint: '/identity/email/check',
                        label: 'Check Email'
                    }]
                },
                {
                    id: 'privyId',
                    name: 'privyId',
                    label: 'Privy ID',
                    type: 'text',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isSigner(v),
                    verification: [{
                        id: 'check-privy',
                        type: 'VERIFY_PRIVY',
                        endpoint: '/identity/privy/check',
                        label: 'Verify Privy',
                        required: true
                    }]
                },
                {
                    id: 'enterpriseId',
                    name: 'enterpriseId',
                    label: 'Enterprise ID',
                    type: 'text',
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isSigner(v)
                },
                {
                    id: 'phone',
                    name: 'phone',
                    label: 'Phone Number',
                    type: 'phone',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isBOD(v),
                    verification: [{
                        id: 'check-phone',
                        type: 'VERIFY_PHONE',
                        endpoint: '/identity/phone/check',
                        label: 'Check Phone'
                    }]
                },
                {
                    id: 'npwp',
                    name: 'npwp',
                    label: 'NPWP',
                    type: 'text',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isShareholderCompany(v)
                },
                // {
                //     id: 'fileId',
                //     name: 'fileId',
                //     label: 'Company Document',
                //     type: 'file',
                //     required: true,
                //     grid: { xs: 12, md: 6 },
                //     visibility: (v) => isShareholderCompany(v)
                // },
                {
                    id: 'ownershipPercentage',
                    name: 'ownershipPercentage',
                    label: 'Ownership Percentage (%)',
                    type: 'percentage',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isShareholder(v)
                },
                {
                    id: 'hasAuthorityLimitation',
                    name: 'hasAuthorityLimitation',
                    label: 'Has Authority Limitation?',
                    type: 'switch',
                    grid: { xs: 12 },
                    visibility: (v) => isSigner(v)
                },
                {
                    id: 'authorityLimitationNotes',
                    name: 'authorityLimitationNotes',
                    label: 'Authority Limitation Notes',
                    type: 'textarea',
                    required: true,
                    grid: { xs: 12 },
                    visibility: (v) => isSigner(v) && v.hasAuthorityLimitation
                },
                {
                    id: 'authorityLimitationFileId',
                    name: 'authorityLimitationFileId',
                    label: 'Authority Limitation Document',
                    type: 'file',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isSigner(v) && v.hasAuthorityLimitation
                },
                {
                    id: 'authorityLimitationExpiredAt',
                    name: 'authorityLimitationExpiredAt',
                    label: 'Authority Limitation Expiry',
                    type: 'date',
                    required: true,
                    grid: { xs: 12, md: 6 },
                    visibility: (v) => isSigner(v) && v.hasAuthorityLimitation
                }
            ]
        },
    ]
}
