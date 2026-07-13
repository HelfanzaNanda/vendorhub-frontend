import React, { useState, useEffect, useMemo } from 'react'
import { Box, Card, Typography, TextField, Grid, useTheme, alpha } from '@mui/material'
import { WorklistDataGroupSchema, WorklistFieldSchema } from '../schemas/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { toast } from 'sonner'
import _get from 'lodash/get'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CancelIcon from '@mui/icons-material/Cancel'
import GenericFieldRenderer from './GenericFieldRenderer'
import { WorklistReviewContext } from '../context'

interface WorklistReviewCardProps {
  record: any
  group: WorklistDataGroupSchema
  workflowTransactionId: string
}

export default function WorklistReviewCard({ record, group, workflowTransactionId }: WorklistReviewCardProps) {
  const theme = useTheme()
  const [reviewStatus, setReviewStatus] = useState<'OK' | 'NOT_OK' | ''>(record.reviewStatus || '')
  const [reviewRemark, setReviewRemark] = useState(record.reviewRemark || '')
  
  const { worklistData } = React.useContext(WorklistReviewContext)
  const canReview = worklistData?.permissions?.canReview ?? false
  const showReviewSection = record.permissions?.showReviewSection ?? false
  
  // Auto Save Mutation
  const saveReviewMutation = useMutation({
    mutationFn: (payload: any) => 
      api.post(`/worklists/${workflowTransactionId}/reviews`, payload),
    onSuccess: () => {
      toast.success('Review saved.')
    },
    onError: () => {
      toast.error('Failed to save review.')
    }
  })

  // Debounced save for remark
  useEffect(() => {
    if (!showReviewSection || !canReview) return
    if (reviewStatus === '') return

    if (reviewStatus === record.reviewStatus && reviewRemark === (record.reviewRemark || '')) {
      return
    }

    const timeout = setTimeout(() => {
      saveReviewMutation.mutate({
        sectionId: group.reviewSectionId,
        recordId: record.id,
        status: reviewStatus,
        remark: reviewRemark
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [reviewStatus, reviewRemark, record.reviewStatus, record.reviewRemark, group.reviewSectionId, record.id, showReviewSection, canReview])

  const action = record.action || 'NO CHANGE'

  const handleStatusChange = (status: 'OK' | 'NOT_OK') => {
    if (!canReview) return;
    setReviewStatus(status)
    if (status === 'OK') {
      setReviewRemark('')
    }
  }

  const changedCount = useMemo(() => {
    if (action !== 'UPDATE') return 0;
    let count = 0;
    group.sections.forEach(section => {
      section.fields.forEach(field => {
        const newVal = _get(record.data, field.id)
        const oldVal = _get(record.originalData, field.id)
        if (String(newVal) !== String(oldVal)) count++;
      })
    })
    return count;
  }, [action, group, record])

  const getIconForTitle = (title: string) => {
    if (group.icon) return group.icon; // Use schema icon if provided
    const t = title.toLowerCase();
    if (t.includes('company')) return 'ri-building-4-line';
    if (t.includes('person')) return 'ri-user-settings-line';
    if (t.includes('bank')) return 'ri-bank-line';
    if (t.includes('license')) return 'ri-article-line';
    if (t.includes('capabilit') || t.includes('portfolio') || t.includes('competency')) return 'ri-award-line';
    if (t.includes('document')) return 'ri-folder-2-line';
    if (t.includes('financial')) return 'ri-money-dollar-circle-line';
    if (t.includes('affiliat')) return 'ri-git-branch-line';
    return 'ri-file-list-3-line';
  }

  const renderField = (field: WorklistFieldSchema) => {
    // Check visibility rule
    if (field.visible !== undefined) {
      if (typeof field.visible === 'function') {
        if (!field.visible(record.data)) return null;
      } else if (!field.visible) {
        return null;
      }
    }

    const newVal = _get(record.data, field.id)
    const oldVal = _get(record.originalData, field.id)
    
    const isChanged = action === 'UPDATE' && String(newVal) !== String(oldVal)

    // Grid sizing from schema
    const gridProps = field.width ? { xs: 12, md: field.width } : { xs: 12 }

    const content = (() => {
      if (action === 'CREATE') {
        return (
          <Box className="flex flex-col mb-2 pl-3 py-1.5 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1) }}>
            <Box className="flex items-center gap-2 mb-0.5">
              <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>{field.label}</Typography>
              <Box sx={{ px: 1, py: 0.5, bgcolor: alpha(theme.palette.success.main, 0.2), color: 'success.main', fontSize: '9px', borderRadius: 1, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>New</Box>
            </Box>
            <GenericFieldRenderer value={newVal} field={field} />
          </Box>
        )
      }

      if (action === 'DELETE') {
        return (
          <Box className="flex flex-col mb-2 pl-3 py-1.5 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) }}>
            <Box className="flex items-center gap-2 mb-0.5">
              <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>{field.label}</Typography>
              <Box sx={{ px: 1, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.2), color: 'error.main', fontSize: '9px', borderRadius: 1, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Deleted</Box>
            </Box>
            <Box sx={{ opacity: 0.6, textDecoration: 'line-through' }}>
              <GenericFieldRenderer value={oldVal} field={field} />
            </Box>
          </Box>
        )
      }

      if (action === 'UPDATE') {
        if (isChanged) {
          return (
            <Box className="flex flex-col mb-2 pl-3 py-1.5 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'warning.main', bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <Box className="flex items-center gap-2 mb-0.5">
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>{field.label}</Typography>
                <Box sx={{ px: 1, py: 0.5, bgcolor: alpha(theme.palette.warning.main, 0.2), color: 'warning.main', fontSize: '9px', borderRadius: 1, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Changed</Box>
              </Box>
              <Box className="flex flex-wrap items-center gap-2">
                <Box sx={{ opacity: 0.5, textDecoration: 'line-through' }}>
                  <GenericFieldRenderer value={oldVal} field={field} />
                </Box>
                <ArrowForwardIcon sx={{ color: 'warning.main', fontSize: 14 }} />
                <GenericFieldRenderer value={newVal} originalValue={oldVal} field={field} />
              </Box>
            </Box>
          )
        } else {
          return (
            <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent">
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{field.label}</Typography>
              <Box className="flex items-center gap-2">
                <GenericFieldRenderer value={newVal} field={field} />
                <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'action.hover', color: 'text.secondary', fontSize: '9px', borderRadius: 1, fontWeight: 500 }}>No Change</Box>
              </Box>
            </Box>
          )
        }
      }

      // NO CHANGE
      return (
        <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent" sx={{ opacity: 0.8 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{field.label}</Typography>
          <GenericFieldRenderer value={newVal} field={field} />
        </Box>
      )
    })();

    return (
      <Grid item {...gridProps} key={field.id}>
        {content}
      </Grid>
    )
  }

  // Use dynamic card config from schema if available
  const cardTitle = group.card?.titleField ? _get(record.data, group.card.titleField) : group.title;
  const cardSubtitle = group.card?.subtitleField ? _get(record.data, group.card.subtitleField) : null;
  const cardBadge = group.card?.badgeField ? _get(record.data, group.card.badgeField) : null;

  return (
    <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: theme.shadows[2] }}>
      {/* Header */}
      <Box className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: alpha(theme.palette.action.hover, 0.5) }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <i className={`${getIconForTitle(group.title)}`} style={{ fontSize: '1.25rem', color: theme.palette.primary.main }} />
            {cardTitle}
          </Typography>
          {cardSubtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, ml: 4 }}>
              {cardSubtitle}
            </Typography>
          )}
        </Box>
        
        <Box className="flex items-center gap-3 flex-wrap">
          {action === 'UPDATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.warning.main, 0.15), color: 'warning.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>🟠 UPDATE</Box>}
          {action === 'CREATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.success.main, 0.15), color: 'success.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>🟢 CREATE</Box>}
          {action === 'DELETE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.15), color: 'error.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>🔴 DELETE</Box>}
          {action === 'NO CHANGE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.text.secondary, 0.1), color: 'text.secondary', borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>⚪ NO CHANGE</Box>}
          
          {action === 'UPDATE' && (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', px: 1.5, py: 0.5, borderRadius: 1, boxShadow: 1 }}>
              {changedCount} Changed Fields
            </Typography>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box className="p-5 md:p-6" sx={{ bgcolor: 'background.paper' }}>
        {group.sections.map((section, index) => (
          <Box key={section.id} sx={index !== 0 ? { mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' } : {}}>
            {section.title && (
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1 }}>
                {section.title}
              </Typography>
            )}
            {(() => {
              if (section.layout === 'full') {
                return (
                  <Box className="flex flex-col gap-4">
                    {section.fields.map(renderField)}
                  </Box>
                )
              }
              
              // Default to grid layout
              const cols = section.columns || 2
              let gridClass = "grid gap-x-8 gap-y-2"
              if (cols === 1) gridClass += " grid-cols-1"
              else if (cols === 2) gridClass += " grid-cols-1 md:grid-cols-2"
              else if (cols === 3) gridClass += " grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              else if (cols === 4) gridClass += " grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              
              return (
                <Grid container spacing={3}>
                  {section.fields.map(renderField)}
                </Grid>
              )
            })()}
          </Box>
        ))}
      </Box>

      {/* Footer - Review Result */}
      {showReviewSection && (
        <Box className="p-6 md:p-8" sx={{ bgcolor: alpha(theme.palette.action.hover, 0.3), borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
            Review Result
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box className="flex gap-4">
                <Box
                  onClick={() => handleStatusChange('OK')}
                  sx={{
                    cursor: canReview ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, borderRadius: 3, border: '2px solid', transition: 'all 0.2s', fontWeight: 600,
                    ...(reviewStatus === 'OK' 
                      ? { borderColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', boxShadow: theme.shadows[2], transform: canReview ? 'scale(1.02)' : 'none' } 
                      : { borderColor: 'divider', bgcolor: 'background.paper', color: 'text.secondary', opacity: canReview ? 1 : 0.6, '&:hover': canReview ? { borderColor: alpha(theme.palette.success.main, 0.5), bgcolor: alpha(theme.palette.success.main, 0.05) } : {} })
                  }}
                >
                  <CheckCircleIcon /> OK
                </Box>
                <Box
                  onClick={() => handleStatusChange('NOT_OK')}
                  sx={{
                    cursor: canReview ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, borderRadius: 3, border: '2px solid', transition: 'all 0.2s', fontWeight: 600,
                    ...(reviewStatus === 'NOT_OK' 
                      ? { borderColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', boxShadow: theme.shadows[2], transform: canReview ? 'scale(1.02)' : 'none' } 
                      : { borderColor: 'divider', bgcolor: 'background.paper', color: 'text.secondary', opacity: canReview ? 1 : 0.6, '&:hover': canReview ? { borderColor: alpha(theme.palette.error.main, 0.5), bgcolor: alpha(theme.palette.error.main, 0.05) } : {} })
                  }}
                >
                  <CancelIcon /> NOT OK
                </Box>
              </Box>
            </Grid>
  
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                label="Remark"
                value={reviewRemark}
                onChange={(e) => setReviewRemark(e.target.value)}
                placeholder={canReview ? "Enter remark here..." : ""}
                required={reviewStatus === 'NOT_OK'}
                disabled={!canReview || reviewStatus !== 'NOT_OK'}
                error={reviewStatus === 'NOT_OK' && !reviewRemark}
                helperText={reviewStatus === 'NOT_OK' && !reviewRemark ? 'Remark is required if Not OK' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: reviewStatus === 'NOT_OK' ? alpha(theme.palette.error.main, 0.05) : alpha(theme.palette.action.disabledBackground, 0.5),
                    transition: 'all 0.2s',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Card>
  )
}
