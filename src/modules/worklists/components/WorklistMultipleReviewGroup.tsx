import React, { useState, useEffect } from 'react'
import { Box, Card, Typography, TextField, Grid, useTheme, alpha, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'
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
import { WorklistReviewContext } from '../context'

const RecordItem = ({ record, group, workflowTransactionId, index, theme, canReview, isChild }: any) => {
  const [reviewStatus, setReviewStatus] = useState<'OK' | 'NOT_OK' | ''>(record.reviewStatus || '')
  const [reviewRemark, setReviewRemark] = useState(record.reviewRemark || '')
  
  const showReviewSection = record.permissions?.showReviewSection ?? false

  const saveReviewMutation = useMutation({
    mutationFn: (payload: any) => 
      api.post(`/worklists/${workflowTransactionId}/reviews`, payload),
    onSuccess: () => {
      // toast.success('Review saved.')
    },
    onError: () => {
      toast.error('Failed to save review.')
    }
  })

  useEffect(() => {
    if (!showReviewSection || !canReview || isChild) return
    if (reviewStatus === '') return

    if (reviewStatus === record.reviewStatus && reviewRemark === (record.reviewRemark || '')) {
      return
    }

    if (reviewStatus === 'NOT_OK' && !reviewRemark.trim()) {
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
  }, [reviewStatus, reviewRemark, record.reviewStatus, record.reviewRemark, showReviewSection, canReview, isChild])

  const handleStatusChange = (status: 'OK' | 'NOT_OK') => {
    if (!canReview) return
    setReviewStatus(status)
    if (status === 'OK') {
      setReviewRemark('')
    } else {
      if (!reviewRemark.trim()) {
        toast.error('Remarks is required for NOT OK.');
      }
    }
  }

  const action = record.action || 'NO_ACTION'
  let changedCount = 0;
  if (action === 'UPDATE') {
    group.sections.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        const newVal = _get(record.data, field.id)
        const oldVal = _get(record.originalData, field.id)
        if (String(newVal) !== String(oldVal)) changedCount++;
      })
    })
  }

  const cardTitle = group.card?.titleField ? _get(record.data, group.card.titleField) : (record.data?.name || `Record ${index + 1}`);
  const cardSubtitle = group.card?.subtitleField ? _get(record.data, group.card.subtitleField) : (record.data?.position || '');

  const renderField = (field: WorklistFieldSchema) => {
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
          <Box className="flex flex-col mb-2 py-1.5 pl-3 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.05) }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{field.label}</Typography>
            <GenericFieldRenderer value={newVal} field={field} />
          </Box>
        )
      }

      if (action === 'DELETE') {
        return (
          <Box className="flex flex-col mb-2 py-1.5 pl-3 rounded-r" sx={{ borderLeft: '2px solid', borderLeftColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.05), opacity: 0.6, textDecoration: 'line-through' }}>
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

  const childRecordsConfig = group.childRecords;
  const childRecords = childRecordsConfig ? _get(record, childRecordsConfig.dataField) || [] : [];

  const contentBody = (
    <Box sx={{ p: 3 }}>
      {group.sections.map((section: any, idx: number) => (
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
                  {section.fields.map(renderField)}
                </Box>
              )
            }
            return (
              <Grid container spacing={3}>
                {section.fields.map(renderField)}
              </Grid>
            )
          })()}
        </Box>
      ))}

      {childRecordsConfig && childRecords.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1 }}>
            {childRecordsConfig.group.title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {childRecords.map((childRec: any, cIdx: number) => (
              <RecordItem 
                key={childRec.id || cIdx}
                record={childRec} 
                group={childRecordsConfig.group} 
                workflowTransactionId={workflowTransactionId} 
                index={cIdx} 
                theme={theme}
                canReview={false} // Children don't get reviewed separately
                isChild={true}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )

  const badges = (
    <>
      {action === 'UPDATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.warning.main, 0.15), color: 'warning.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🟠 UPDATE</Box>}
      {action === 'CREATE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.success.main, 0.15), color: 'success.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🟢 CREATE</Box>}
      {action === 'DELETE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.15), color: 'error.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>🔴 DELETE</Box>}
      {action === 'NO_ACTION' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.text.secondary, 0.1), color: 'text.secondary', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>⚪ NO_ACTION</Box>}
      {action === 'NO CHANGE' && <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.text.secondary, 0.1), color: 'text.secondary', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem' }}>⚪ NO CHANGE</Box>}
      {action === 'UPDATE' && changedCount > 0 && (
        <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
          {changedCount} Changed
        </Typography>
      )}
    </>
  )

  if (isChild) {
    return (
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: alpha(theme.palette.action.hover, 0.2), display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{cardTitle}</Typography>
            {cardSubtitle && <Typography variant="caption" color="text.secondary">{cardSubtitle}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showReviewSection && !reviewStatus && !isChild && (
              <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                ⚠ Review belum dipilih.
              </Box>
            )}
            {badges}
          </Box>
        </Box>
        {contentBody}
      </Box>
    )
  }

  return (
    <Box sx={{ border: showReviewSection && !reviewStatus && !isChild ? '2px solid' : '1px solid', borderColor: showReviewSection && !reviewStatus && !isChild ? 'error.main' : 'divider', borderRadius: 2, mb: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
      <Accordion sx={{ '&:before': { display: 'none' }, boxShadow: 'none' }} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: alpha(theme.palette.action.hover, 0.2), borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>{cardTitle}</Typography>
              {cardSubtitle && <Typography variant="body2" color="text.secondary">{cardSubtitle}</Typography>}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {showReviewSection && !reviewStatus && !isChild && (
                <Box sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  ⚠ Review belum dipilih.
                </Box>
              )}
              {badges}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {contentBody}

          {showReviewSection && (
            <>
              <Divider />
              <Box className="p-4" sx={{ bgcolor: alpha(theme.palette.action.hover, 0.1) }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
                  Review Result - {cardTitle}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={5}>
                    <Box className="flex gap-2">
                      <Box
                        onClick={() => handleStatusChange('OK')}
                        sx={{
                          cursor: canReview ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, border: '1px solid', transition: 'all 0.2s', fontWeight: 600, fontSize: '0.875rem',
                          ...(reviewStatus === 'OK' 
                            ? { borderColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', boxShadow: 'none' } 
                            : { borderColor: 'divider', bgcolor: 'transparent', color: 'text.secondary', opacity: canReview ? 1 : 0.6, '&:hover': canReview ? { borderColor: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.05) } : {} })
                        }}
                      >
                        <CheckCircleIcon fontSize="small" /> OK
                      </Box>
                      <Box
                        onClick={() => handleStatusChange('NOT_OK')}
                        sx={{
                          cursor: canReview ? 'pointer' : 'default', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, border: '1px solid', transition: 'all 0.2s', fontWeight: 600, fontSize: '0.875rem',
                          ...(reviewStatus === 'NOT_OK' 
                            ? { borderColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', boxShadow: 'none' } 
                            : { borderColor: 'divider', bgcolor: 'transparent', color: 'text.secondary', opacity: canReview ? 1 : 0.6, '&:hover': canReview ? { borderColor: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.05) } : {} })
                        }}
                      >
                        <CancelIcon fontSize="small" /> NOT OK
                      </Box>
                    </Box>
                  </Grid>
        
                  <Grid item xs={12} md={7}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      variant="outlined"
                      label="Remarks"
                      value={reviewRemark}
                      onChange={(e) => setReviewRemark(e.target.value)}
                      placeholder={canReview ? "Enter remarks here..." : ""}
                      required={reviewStatus === 'NOT_OK'}
                      disabled={!canReview || reviewStatus !== 'NOT_OK'}
                      error={reviewStatus === 'NOT_OK' && !reviewRemark.trim()}
                      helperText={reviewStatus === 'NOT_OK' && !reviewRemark.trim() ? 'Remarks is required for NOT OK status.' : ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: reviewStatus === 'NOT_OK' ? alpha(theme.palette.error.main, 0.02) : alpha(theme.palette.action.disabledBackground, 0.3),
                          transition: 'all 0.2s',
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

interface WorklistMultipleReviewGroupProps {
  records: any[]
  group: WorklistDataGroupSchema
  workflowTransactionId: string
  pendingReviews?: number
}

export default function WorklistMultipleReviewGroup({ records, group, workflowTransactionId, pendingReviews = 0 }: WorklistMultipleReviewGroupProps) {
  const theme = useTheme()
  const { worklistData } = React.useContext(WorklistReviewContext)
  const canReview = worklistData?.permissions?.canReview ?? false

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

  return (
    <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
      <Box className="pb-3 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" sx={{ borderBottom: '2px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <i className={`${getIconForTitle(group.title)}`} style={{ fontSize: '1.25rem', color: theme.palette.primary.main }} />
          {group.title}
          {pendingReviews > 0 && (
            <Box sx={{ bgcolor: 'error.main', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {pendingReviews}
            </Box>
          )}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {records.map((record, index) => (
          <RecordItem 
            key={record.id || index}
            record={record} 
            group={group} 
            workflowTransactionId={workflowTransactionId} 
            index={index} 
            theme={theme}
            canReview={canReview}
          />
        ))}
      </Box>
    </Card>
  )
}
