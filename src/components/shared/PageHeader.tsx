'use client'

import Link from 'next/link'

import { Box, Breadcrumbs, Link as MuiLink, Typography, Button } from '@mui/material'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
  actionLabel?: string
  actionHref?: string
  onActionClick?: () => void
  actionIcon?: React.ReactNode
}

export default function PageHeader({
  title,
  breadcrumbs,
  actionLabel,
  actionHref,
  onActionClick,
  actionIcon,
}: PageHeaderProps) {
  return (
    <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <Box className="flex flex-col gap-2">
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1

            if (isLast) {
              return (
                <Typography key={index} color="text.primary">
                  {item.label}
                </Typography>
              )
            }

            return (
              <MuiLink
                key={index}
                component={Link}
                underline="hover"
                color="inherit"
                href={item.href || '#'}
              >
                {item.label}
              </MuiLink>
            )
          })}
        </Breadcrumbs>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
      </Box>

      {actionLabel && (
        <Box>
          {actionHref ? (
            <Button
              component={Link}
              href={actionHref}
              variant="contained"
              color="primary"
              startIcon={actionIcon}
            >
              {actionLabel}
            </Button>
          ) : (
            <Button
              onClick={onActionClick}
              variant="contained"
              color="primary"
              startIcon={actionIcon}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}
