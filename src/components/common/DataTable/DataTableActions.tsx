'use client'

import { useState } from 'react'

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react'

interface DataTableActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function DataTableActions({ onView, onEdit, onDelete }: DataTableActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="flex justify-end items-center">
      <IconButton
        onClick={handleClick}
        size="small"
        className="text-textSecondary hover:text-textPrimary hover:bg-actionHover transition-colors cursor-pointer"
      >
        <MoreHorizontal className="h-4 w-4" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            className: 'border border-[var(--border-color)] bg-backgroundPaper shadow-lg py-1 min-w-[130px] z-50',
          }
        }}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              onView()
              handleClose()
            }}
            className="hover:bg-actionHover py-1.5 px-4 cursor-pointer"
          >
            <ListItemIcon className="min-w-[28px] !text-textSecondary">
              <Eye className="h-4 w-4" />
            </ListItemIcon>
            <ListItemText className="!text-textPrimary text-sm">View</ListItemText>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit()
              handleClose()
            }}
            className="hover:bg-actionHover py-1.5 px-4 cursor-pointer"
          >
            <ListItemIcon className="min-w-[28px] !text-textSecondary">
              <Edit className="h-4 w-4" />
            </ListItemIcon>
            <ListItemText className="!text-textPrimary text-sm">Edit</ListItemText>
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete()
              handleClose()
            }}
            className="hover:bg-actionHover py-1.5 px-4 cursor-pointer"
          >
            <ListItemIcon className="min-w-[28px] !text-error">
              <Trash className="h-4 w-4" />
            </ListItemIcon>
            <ListItemText className="!text-error text-sm">Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}
