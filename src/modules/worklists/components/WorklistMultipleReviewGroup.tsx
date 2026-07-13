import React, { useState, useEffect } from 'react'
import { Box, Card, Typography, TextField, Grid, useTheme, alpha, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { WorklistDataGroupSchema, WorklistFieldSchema } from '../schemas/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { toast } from 'sonner'
import _get from 'lodash/get'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CancelIcon from '@mui/icons-material/Cancel'
import GenericFieldRenderer from './GenericFieldRenderer'

interface WorklistMultipleReviewGroupProps {
  records: any[]
  group: WorklistDataGroupSchema
  workflowTransactionId: string
}

export default function WorklistMultipleReviewGroup({ records, group, workflowTransactionId }: WorklistMultipleReviewGroupProps) {
  const theme = useTheme()
  const firstRecord = records[0] || {}
  
  const [reviewStatus, setReviewStatus] = useState<'OK' | 'NOT_OK' | ''>(firstRecord.reviewStatus || '')
  const [reviewRemark, setReviewRemark] = useState(firstRecord.reviewRemark || '')
  
  const saveReviewMutation = useMutation({
    mutationFn: async (payload: { status: string; remark: string }) => {
      const promises = records.map(record => 
        api.post(`/worklists/${workflowTransactionId}/reviews`, {
          sectionId: group.reviewSectionId,
          recordId: record.id,
          status: payload.status,
          remark: payload.remark
        })
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      toast.success('Review saved.')
    },
    onError: () => {
      toast.error('Failed to save review.')
    }
  })

  useEffect(() => {
    if (reviewStatus === '') return

    if (reviewStatus === firstRecord.reviewStatus && reviewRemark === (firstRecord.reviewRemark || '')) {
      return
    }

    const timeout = setTimeout(() => {
      saveReviewMutation.mutate({
        status: reviewStatus,
        remark: reviewRemark
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [reviewStatus, reviewRemark, firstRecord.reviewStatus, firstRecord.reviewRemark])

  const handleStatusChange = (status: 'OK' | 'NOT_OK') => {
    setReviewStatus(status)
    if (status === 'OK') {
      setReviewRemark('')
    }
  }

  const getIconForTitle = (title: string) => {
    if (group.icon) return group.icon;
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

  const renderField = (field: WorklistFieldSchema, record: any, action: string) => {
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
    const gridProps = field.width ? { xs: 12, md: field.width } : { xs: 12 }

    const content = (() => {
      if (action === 'CREATE') {
        return (
          <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent">
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{field.label}</Typography>
            <GenericFieldRenderer value={newVal} field={field} />
          </Box>
        )
      }

      if (action === 'DELETE') {
        return (
          <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent" sx={{ opacity: 0.6, textDecoration: 'line-through' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{field.label}</Typography>
            <GenericFieldRenderer value={oldVal} field={field} />
          </Box>
        )
      }

      if (action === 'UPDATE') {
        if (isChanged) {
          return (
            <Box className="flex flex-col mb-2 pl-3 py-1.5 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'warning.main', bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <Box className="flex items-center gap-2 mb-0.5">
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>{field.label}</Typography>
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
        }
      }

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

  return (
    <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: theme.shadows[2] }}>
      <Box className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: alpha(theme.palette.action.hover, 0.5) }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <i className={`${getIconForTitle(group.title)}`} style={{ fontSize: '1.25rem', color: theme.palette.primary.main }} />
          {group.title}
        </Typography>
      </Box>

      <Box className="p-4 md:p-6" sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {records.map((record, index) => {
          const action = record.action || 'NO CHANGE'
          let changedCount = 0;
          if (action === 'UPDATE') {
            group.sections.forEach(section => {
              section.fields.forEach(field => {
                const newVal = _get(record.data, field.id)
                const oldVal = _get(record.originalData, field.id)
                if (String(newVal) !== String(oldVal)) changedCount++;
              })
            })
          }

          const cardTitle = group.card?.titleField ? _get(record.data, group.card.titleField) : (record.data?.name || `Record ${index + 1}`);
          const cardSubtitle = group.card?.subtitleField ? _get(record.data, group.card.subtitleField) : (record.data?.position || '');

          return (
            <Accordion key={record.id || index} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&:before': { display: 'none' } }} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: alpha(theme.palette.action.hover, 0.2), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>{cardTitle}</Typography>
                    {cardSubtitle && <Typography variant="body2" color="text.secondary">{cardSubtitle}</Typography>}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {action === 'UPDATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.warning.main, 0.15), color: 'warning.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🟠 UPDATE</Box>}
                    {action === 'CREATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.success.main, 0.15), color: 'success.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🟢 CREATE</Box>}
                    {action === 'DELETE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.15), color: 'error.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🔴 DELETE</Box>}
                    {action === 'NO CHANGE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.text.secondary, 0.1), color: 'text.secondary', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>⚪ NO CHANGE</Box>}
                    
                    {action === 'UPDATE' && (
                      <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
                        {changedCount} Changed
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 4, pt: 2 }}>
                {group.sections.map((section, idx) => (
                  <Box key={section.id} sx={idx !== 0 ? { mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' } : {}}>
                    {section.title && (
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1 }}>
                        {section.title}
                      </Typography>
                    )}
                    {(() => {
                      if (section.layout === 'full') {
                        return (
                          <Box className="flex flex-col gap-4">
                            {section.fields.map(f => renderField(f, record, action))}
                          </Box>
                        )
                      }
                      
                      return (
                        <Grid container spacing={3}>
                          {section.fields.map(f => renderField(f, record, action))}
                        </Grid>
                      )
                    })()}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Box>

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
                  cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, borderRadius: 3, border: '2px solid', transition: 'all 0.2s', fontWeight: 600,
                  ...(reviewStatus === 'OK' 
                    ? { borderColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', boxShadow: theme.shadows[2], transform: 'scale(1.02)' } 
                    : { borderColor: 'divider', bgcolor: 'background.paper', color: 'text.secondary', '&:hover': { borderColor: alpha(theme.palette.success.main, 0.5), bgcolor: alpha(theme.palette.success.main, 0.05) } })
                }}
              >
                <CheckCircleIcon /> OK
              </Box>
              <Box
                onClick={() => handleStatusChange('NOT_OK')}
                sx={{
                  cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, borderRadius: 3, border: '2px solid', transition: 'all 0.2s', fontWeight: 600,
                  ...(reviewStatus === 'NOT_OK' 
                    ? { borderColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', boxShadow: theme.shadows[2], transform: 'scale(1.02)' } 
                    : { borderColor: 'divider', bgcolor: 'background.paper', color: 'text.secondary', '&:hover': { borderColor: alpha(theme.palette.error.main, 0.5), bgcolor: alpha(theme.palette.error.main, 0.05) } })
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
              placeholder="Enter remark here..."
              required={reviewStatus === 'NOT_OK'}
              disabled={reviewStatus !== 'NOT_OK'}
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
    </Card>
  )
}
