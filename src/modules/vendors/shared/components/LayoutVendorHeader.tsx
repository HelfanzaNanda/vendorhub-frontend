'use client'
import React, { useState } from 'react'

import Link from 'next/link'

import { Box, Breadcrumbs, Link as MuiLink, Typography, Button } from '@mui/material'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface LayoutVendorHeaderProps {
    title: string
    breadcrumbs: BreadcrumbItem[]
    actionLabel?: string
    actionHref?: string
    onActionClick?: () => Promise<void> | void
    actionIcon?: React.ReactNode
    actionDisabled?: boolean
}

export default function LayoutVendorHeader({ title, breadcrumbs, actionLabel, actionHref, onActionClick, actionIcon, actionDisabled, }: LayoutVendorHeaderProps) {
    const [isInternalLoading, setIsInternalLoading] = useState(false);
    const [isInternalSuccess, setIsInternalSuccess] = useState(false);

    const handleActionClick = async () => {
        if (!onActionClick || isInternalLoading || isInternalSuccess || actionDisabled) return;
        setIsInternalLoading(true);
        try {
            await onActionClick();
            setIsInternalSuccess(true);
        } catch (e) {
            setIsInternalLoading(false);
        }
    };

    const disabled = actionDisabled || isInternalLoading || isInternalSuccess;
    const currentIcon = isInternalLoading ? <i className="ri-loader-4-line animate-spin" /> : actionIcon;

    return (
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Box className="flex flex-col gap-2">
                <Breadcrumbs aria-label="breadcrumb">
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1
                        if (isLast) { return (<Typography key={index} color="text.primary"> {item.label} </Typography>) }
                        return (<MuiLink key={index} component={Link} underline="hover" color="inherit" href={item.href || '#'} > {item.label} </MuiLink>)
                    })}
                </Breadcrumbs>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {title}
                </Typography>
            </Box>

            {actionLabel && (
                <Box>
                    {actionHref ? (
                        <Button component={Link} href={actionHref} variant="contained" color="primary" startIcon={currentIcon} >
                            {actionLabel}
                        </Button>
                    ) : (
                        <Button onClick={handleActionClick} variant="contained" color="primary" startIcon={currentIcon} disabled={disabled} >
                            {actionLabel}
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    )
}
