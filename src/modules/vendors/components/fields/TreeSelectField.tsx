'use client'

import React, { useState, useEffect, useMemo } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  Popover,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Radio,
} from '@mui/material'

import type { FieldSchema } from '../../schemas/types'
import { api } from '@/services/api'
import { useVendorStore } from '../../store/vendorStore'

interface TreeNode {
  id: number
  label: string
  type: string
  selectable: boolean
  children?: TreeNode[]
}

export default function TreeSelectField({ field }: { field: FieldSchema }) {
  const { control, formState: { errors } } = useFormContext()
  const { formDrafts } = useVendorStore()
  const error = errors[field.name]

  const industryClassificationIds = useMemo(() => {
    const industryClassifications = formDrafts['vendor_capability_form']?.industryClassifications || []

    
return industryClassifications
      .map((item: any) => item.industryClassificationId)
      .filter(Boolean)
  }, [formDrafts])

  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchTree = async () => {
      setIsLoading(true)

      try {
        let url = `/lookups/${field.lookupEndpoint}`

        if (industryClassificationIds.length > 0) {
          url += `?industryClassificationIds=${industryClassificationIds.join(',')}`
        }

        const response = await api.get<any>(url)

        if (isMounted) {
          // Handle both { data: [...] } and bare array responses
          const items = Array.isArray(response.data)
            ? response.data
            : response?.data?.data || []

          setTreeData(items)
        }
      } catch (err) {
        console.error('Failed to fetch tree data', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    
    if (field.lookupEndpoint) {
      fetchTree()
    }

    return () => { isMounted = false }
  }, [field.lookupEndpoint, industryClassificationIds])

  // Helper to find node by id
  const findNode = (nodes: TreeNode[], id: number): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node

      if (node.children) {
        const found = findNode(node.children, id)

        if (found) return found
      }
    }

    
return null
  }

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value, ref } }) => {
        const selectedNode = value ? findNode(treeData, value) : null
        const displayValue = selectedNode ? selectedNode.label : ''

        return (
          <TreeSelectPicker
            field={field}
            error={error}
            value={value}
            displayValue={displayValue}
            onChange={onChange}
            treeData={treeData}
            isLoading={isLoading}
            inputRef={ref}
          />
        )
      }}
    />
  )
}

function TreeSelectPicker({ 
  field, error, value, displayValue, onChange, treeData, isLoading, inputRef 
}: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({})

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!field.disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearchQuery('')
  }

  const toggleExpand = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Filter tree based on search query
  const filteredTree = useMemo(() => {
    if (!searchQuery) return treeData

    const query = searchQuery.toLowerCase()

    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        const isMatch = node.label.toLowerCase().includes(query)
        let filteredChildren: TreeNode[] = []
        
        if (node.children) {
          filteredChildren = filterNodes(node.children)
        }

        if (isMatch || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren })
        }

        
return acc
      }, [])
    }

    return filterNodes(treeData)
  }, [treeData, searchQuery])

  // Auto-expand nodes when searching
  useEffect(() => {
    if (searchQuery) {
      const expandAll = (nodes: TreeNode[], acc: Record<number, boolean>) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            acc[node.id] = true
            expandAll(node.children, acc)
          }
        })
      }

      setExpandedNodes(prev => {
        const newExpanded = { ...prev }

        expandAll(filteredTree, newExpanded)
        
return newExpanded
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filteredTree])

  const renderTree = (nodes: TreeNode[], depth = 0) => {
    return nodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0
      const isExpanded = !!expandedNodes[node.id]
      const isSelected = value === node.id

      return (
        <React.Fragment key={node.id}>
          <ListItemButton
            sx={{ pl: 2 + depth * 3, py: 0.5 }}
            onClick={(e) => {
              if (node.selectable) {
                onChange(node.id)
                handleClose()
              } else if (hasChildren) {
                toggleExpand(e, node.id)
              }
            }}
          >
            {hasChildren && (
              <IconButton
                size="small"
                onClick={(e) => toggleExpand(e, node.id)}
                sx={{ p: 0.5, mr: 1 }}
              >
                <i className={isExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'} />
              </IconButton>
            )}
            {!hasChildren && <Box sx={{ width: 28, height: 28, mr: 1 }} />}
            
            {node.selectable && (
              <Radio
                checked={isSelected}
                size="small"
                sx={{ p: 0.5 }}
                disableRipple
              />
            )}
            
            <ListItemText 
              primary={node.label} 
              primaryTypographyProps={{ 
                variant: 'body2',
                fontWeight: node.selectable ? 'normal' : 'medium'
              }} 
            />
          </ListItemButton>
          
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderTree(node.children!, depth + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      )
    })
  }

  return (
    <>
      <TextField
        inputRef={inputRef}
        fullWidth
        label={field.required ? `${field.label} *` : field.label}
        placeholder={field.placeholder || 'Select...'}
        value={displayValue}
        onClick={handleClick}
        error={!!error}
        helperText={(error?.message as string) || field.helperText}
        disabled={field.disabled}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <i className="ri-arrow-down-s-line cursor-pointer" />
              )}
            </InputAdornment>
          ),
          sx: { cursor: field.disabled ? 'default' : 'pointer' }
        }}
        inputProps={{
          sx: { cursor: field.disabled ? 'default' : 'pointer' }
        }}
      />
      
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: { width: anchorEl?.clientWidth, maxHeight: 400, display: 'flex', flexDir: 'column' }
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search competencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="ri-search-line" />
                </InputAdornment>
              ),
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper', pt: 0 }}>
          {filteredTree.length > 0 ? (
            renderTree(filteredTree)
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">No options found</Typography>
            </Box>
          )}
        </List>
      </Popover>
    </>
  )
}
