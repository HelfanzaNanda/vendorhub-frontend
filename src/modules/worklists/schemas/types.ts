import type React from 'react'

export type FieldComponentType = 
  | 'text' 
  | 'currency' 
  | 'date' 
  | 'badge' 
  | 'boolean' 
  | 'lookup' 
  | 'link' 
  | 'file' 
  | 'image' 
  | 'textarea' 
  | 'customer-reference' 
  | 'tree-select' 
  | 'display'
  | 'customer-reference-table'

export type FormatterType = 'currency' | 'date' | 'phone' | 'percentage' | 'uppercase'

export type LayoutType = 'grid' | 'full' | 'table' | 'custom'

export interface WorklistFieldSchema {
  id: string
  label: string
  component?: FieldComponentType
  formatter?: FormatterType
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 // For responsive grid sizing
  visible?: boolean | ((item: any) => boolean)
  render?: (value: any, originalValue: any) => React.ReactNode // Support for custom rendering logic
}

export interface WorklistSectionSchema {
  id: string
  title?: string
  layout?: LayoutType
  columns?: 1 | 2 | 3 | 4
  fields: WorklistFieldSchema[]
}

export interface WorklistCardSchema {
  titleField?: string
  subtitleField?: string
  badgeField?: string
  collapsible?: boolean
}

export interface WorklistChildRecordConfig {
  dataField: string;
  group: WorklistDataGroupSchema;
}

export interface WorklistDataGroupSchema {
  id: string
  title: string
  icon?: string // Mapped to the specific icon class for this card
  endpoint: string // The API endpoint to fetch temp data
  isMultiple?: boolean // Does this group render a list of cards or a single card?
  reviewSectionId: string // the unique section id for auto-save review
  card?: WorklistCardSchema // configuration for the wrapper card
  sections: WorklistSectionSchema[]
  childRecords?: WorklistChildRecordConfig
}

export interface WorklistTabSchema {
  id: string
  label: string
  icon?: string
  isSummary?: boolean // If true, it uses the /worklists/:id endpoint and a different UI
  isHistory?: boolean
  groups?: WorklistDataGroupSchema[]
}

export interface WorklistProfileSchema {
  tabs: WorklistTabSchema[]
}
