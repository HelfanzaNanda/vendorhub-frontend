'use client'

import { useState, useEffect } from 'react'
import { Box, Card, Typography, Fade } from '@mui/material'

import type { DatatableConfig } from '../schemas/types'
import VendorCrudTable from './VendorCrudTable'

interface DataTableSectionProps {
  configs: DatatableConfig[]
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'BOARD_OF_DIRECTORS': return '👔'
    case 'SHAREHOLDER': return '👥'
    case 'AUTHORIZED_SIGNER': return '✍️'
    case 'USER_ACCESS': return '🛡️'
    case 'BANK_ACCOUNT': return '🏦'
    case 'AFFILIATE': return '🏢'
    case 'COMPETENCY': return '🏅'
    case 'FINANCIAL_REPORT': return '📈'
    default: return '📄'
  }
}

export default function DataTableSection({ configs }: DataTableSectionProps) {
  const [activeConfigId, setActiveConfigId] = useState<string>(configs[0]?.id || '')
  const [totals, setTotals] = useState<Record<string, number>>({})

  // If configs change, reset active config
  useEffect(() => {
    if (configs.length > 0 && !configs.find(c => c.id === activeConfigId)) {
      setActiveConfigId(configs[0].id)
    }
  }, [configs, activeConfigId])

  const showSelector = configs.length > 1

  return (
    <Box className="flex flex-col h-full gap-4 w-full">
      {showSelector && (
        <Box className="flex flex-row gap-4 mb-2 overflow-x-auto pb-2">
          {configs.map((config) => {
            const isActive = activeConfigId === config.id
            const total = totals[config.id] || 0
            
            return (
              <Card
                key={`selector-${config.id}`}
                className={`cursor-pointer min-w-[240px] flex-shrink-0 transition-all duration-300 border-2 ${
                  isActive 
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onClick={() => setActiveConfigId(config.id)}
                elevation={isActive ? 2 : 1}
              >
                <Box className="p-4 flex flex-col gap-2">
                  <Box className="flex items-center gap-3">
                    <Typography variant="h5">
                      {getCategoryIcon(config.id)}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={isActive ? "bold" : "medium"}
                      color={isActive ? "primary" : "text.primary"}
                      className="line-clamp-1"
                    >
                      {config.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" className="pl-9">
                    {total} {total === 1 ? 'Record' : 'Records'}
                  </Typography>
                </Box>
              </Card>
            )
          })}
        </Box>
      )}

      {/* Render all tables but only display the active one to keep state and cache */}
      <Box className="relative flex-grow flex flex-col gap-4">
        {configs.map((config) => (
          <Box 
            key={`table-${config.id}`} 
            style={{ display: activeConfigId === config.id ? 'block' : 'none' }}
          >
            <Fade in={activeConfigId === config.id} timeout={400}>
              <Box>
                <VendorCrudTable
                  config={config}
                  onTotalChange={(total) => setTotals(prev => prev[config.id] === total ? prev : { ...prev, [config.id]: total })}
                />
              </Box>
            </Fade>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
