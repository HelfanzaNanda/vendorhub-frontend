import React, { useState, useEffect, useMemo } from 'react'
import { Box, Card, Typography, TextField, Grid } from '@mui/material'
import { WorklistDataGroupSchema, WorklistFieldSchema } from '../schemas/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { toast } from 'sonner'
import _get from 'lodash/get'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CancelIcon from '@mui/icons-material/Cancel'
import GenericFieldRenderer from './GenericFieldRenderer'

interface WorklistReviewCardProps {
  record: any
  group: WorklistDataGroupSchema
  workflowTransactionId: string
}

export default function WorklistReviewCard({ record, group, workflowTransactionId }: WorklistReviewCardProps) {
  const [reviewStatus, setReviewStatus] = useState<'OK' | 'NOT_OK' | ''>(record.reviewStatus || '')
  const [reviewRemark, setReviewRemark] = useState(record.reviewRemark || '')
  
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
    if (reviewStatus === '') return

    const timeout = setTimeout(() => {
      saveReviewMutation.mutate({
        sectionId: group.reviewSectionId,
        recordId: record.id,
        status: reviewStatus,
        remark: reviewRemark
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [reviewStatus, reviewRemark])

  const action = record.action || 'NO CHANGE'

  const handleStatusChange = (status: 'OK' | 'NOT_OK') => {
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
          <Box className="flex flex-col mb-2 pl-3 border-l-2 border-green-400 bg-green-50/30 py-1.5 rounded-r">
            <Box className="flex items-center gap-2 mb-0.5">
              <Typography variant="caption" className="text-gray-700 font-semibold">{field.label}</Typography>
              <Box className="px-1 py-0.5 bg-green-100 text-green-700 text-[9px] rounded font-bold uppercase tracking-wider">New</Box>
            </Box>
            <GenericFieldRenderer value={newVal} field={field} />
          </Box>
        )
      }

      if (action === 'DELETE') {
        return (
          <Box className="flex flex-col mb-2 pl-3 border-l-2 border-red-400 bg-red-50/30 py-1.5 rounded-r">
            <Box className="flex items-center gap-2 mb-0.5">
              <Typography variant="caption" className="text-gray-700 font-semibold">{field.label}</Typography>
              <Box className="px-1 py-0.5 bg-red-100 text-red-700 text-[9px] rounded font-bold uppercase tracking-wider">Deleted</Box>
            </Box>
            <Box className="opacity-60 line-through">
              <GenericFieldRenderer value={oldVal} field={field} />
            </Box>
          </Box>
        )
      }

      if (action === 'UPDATE') {
        if (isChanged) {
          return (
            <Box className="flex flex-col mb-2 pl-3 border-l-2 border-amber-400 bg-amber-50/40 py-1.5 rounded-r">
              <Box className="flex items-center gap-2 mb-0.5">
                <Typography variant="caption" className="text-gray-800 font-semibold">{field.label}</Typography>
                <Box className="px-1 py-0.5 bg-amber-200 text-amber-800 text-[9px] rounded font-bold uppercase tracking-wider">Changed</Box>
              </Box>
              <Box className="flex flex-wrap items-center gap-2">
                <Box className="opacity-50 line-through">
                  <GenericFieldRenderer value={oldVal} field={field} />
                </Box>
                <ArrowForwardIcon className="text-amber-600" style={{ fontSize: 14 }} />
                <GenericFieldRenderer value={newVal} originalValue={oldVal} field={field} />
              </Box>
            </Box>
          )
        } else {
          return (
            <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent">
              <Typography variant="caption" className="text-gray-500 font-medium mb-0.5">{field.label}</Typography>
              <Box className="flex items-center gap-2">
                <GenericFieldRenderer value={newVal} field={field} />
                <Box className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] rounded font-medium">No Change</Box>
              </Box>
            </Box>
          )
        }
      }

      // NO CHANGE
      return (
        <Box className="flex flex-col mb-2 py-1.5 pl-3 border-l-2 border-transparent opacity-80">
          <Typography variant="caption" className="text-gray-500 font-medium mb-0.5">{field.label}</Typography>
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
    <Card className="mb-8 border border-gray-200 shadow-md rounded-2xl overflow-hidden bg-white">
      {/* Header */}
      <Box className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Box>
          <Typography variant="h6" className="font-bold text-gray-800 flex items-center gap-3">
            <i className={`${getIconForTitle(group.title)} text-xl text-primary-600`} />
            {cardTitle}
          </Typography>
          {cardSubtitle && (
            <Typography variant="body2" className="text-gray-500 mt-1 ml-8">
              {cardSubtitle}
            </Typography>
          )}
        </Box>
        
        <Box className="flex items-center gap-3 flex-wrap">
          {action === 'UPDATE' && <Box className="px-3 py-1 bg-amber-100 text-amber-800 rounded-md font-bold text-sm">🟠 UPDATE</Box>}
          {action === 'CREATE' && <Box className="px-3 py-1 bg-green-100 text-green-800 rounded-md font-bold text-sm">🟢 CREATE</Box>}
          {action === 'DELETE' && <Box className="px-3 py-1 bg-red-100 text-red-800 rounded-md font-bold text-sm">🔴 DELETE</Box>}
          {action === 'NO CHANGE' && <Box className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md font-bold text-sm">⚪ NO CHANGE</Box>}
          
          {action === 'UPDATE' && (
            <Typography variant="body2" className="text-gray-500 font-semibold bg-white border border-gray-200 px-3 py-1 rounded-md shadow-sm">
              {changedCount} Changed Fields
            </Typography>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box className="p-5 md:p-6 bg-white">
        {group.sections.map((section, index) => (
          <Box key={section.id} className={`${index !== 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}`}>
            {section.title && (
              <Typography variant="subtitle2" className="font-bold mb-4 text-gray-700 uppercase tracking-wider">
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
      <Box className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
        <Typography variant="subtitle2" className="font-bold mb-4 text-gray-800 uppercase tracking-wider text-xs">
          Review Result
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box className="flex gap-4">
              <Box
                onClick={() => handleStatusChange('OK')}
                className={`cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 transition-all font-semibold ${
                  reviewStatus === 'OK' 
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md transform scale-[1.02]' 
                    : 'border-gray-200 bg-white text-gray-500 hover:border-green-300 hover:bg-green-50/50'
                }`}
              >
                <CheckCircleIcon /> OK
              </Box>
              <Box
                onClick={() => handleStatusChange('NOT_OK')}
                className={`cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 transition-all font-semibold ${
                  reviewStatus === 'NOT_OK' 
                    ? 'border-red-500 bg-red-50 text-red-700 shadow-md transform scale-[1.02]' 
                    : 'border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:bg-red-50/50'
                }`}
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
              className={`transition-all ${reviewStatus === 'NOT_OK' ? 'bg-red-50/30' : 'bg-gray-100 opacity-70'}`}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
