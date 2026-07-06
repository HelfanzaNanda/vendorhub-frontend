import type { ZodTypeAny } from 'zod'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file'
  | 'currency'
  | 'percentage'
  | 'field-array'
  | 'autocomplete'
  | 'display'

export interface FieldOption {
  label: string
  value: string | number
  data?: any
}

export interface FieldSchema {
  id: string
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  defaultValue?: any
  helperText?: string
  validation?: ZodTypeAny
  grid?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
  }

  /** Static options for select/multi-select. Use lookupEndpoint for dynamic options. */
  options?: FieldOption[]

  /** Dynamic lookup endpoint: calls GET /lookups/{module}. Overrides static options. */
  lookupEndpoint?: string

  /** Old field — kept for backward compatibility */
  apiEndpoint?: string
  visibility?: (values: any) => boolean

  /** Array items configuration (only used if type === 'field-array') */
  arrayFields?: FieldSchema[]
  arrayItemLabel?: string

  /** Auto-populate mapped fields from an autocomplete's raw data */
  populateFields?: Record<string, string>

  /** Dependency on another field's value (its name) */
  dependsOn?: string
  
  /** Query parameter key to use when fetching dependent lookups (e.g., 'countryId') */
  dependencyParam?: string
}

export interface FormSectionSchema {
  id: string
  title: string
  description?: string
  fields: FieldSchema[]
}

export interface FormSchema {
  id: string
  title: string
  description?: string
  sections: FormSectionSchema[]
}

export interface DatatableColumnDef {
  id: string
  header: string
  accessorKey: string
  cell?: string // Optional formatter hint
}

export interface DatatableConfig {
  id: string
  title: string
  description?: string

  /** Column definitions for the table */
  columns: DatatableColumnDef[]

  /** Base endpoint: GET {endpoint}, POST {endpoint}, PUT {endpoint}/:id, DELETE {endpoint}/:id */
  apiEndpoint: string

  /** Form schema for the Create/Edit modal */
  modalFormSchema?: FormSchema

  /** Whether this table supports Delete action */
  canDelete?: boolean
}

export interface VendorTabSchema {
  id: string
  label: string
  icon: string
  type: 'form' | 'datatable' | 'documents' | 'business_license' | 'mixed' | 'terms_conditions'

  /** Only required if type === 'form' or 'mixed' */
  schema?: FormSchema

  /** API endpoint for form type tabs (POST {tabEndpoint}/save) */
  tabEndpoint?: string

  /** Only required if type === 'datatable' */
  datatableConfigs?: DatatableConfig[]
}

export interface VendorProfileSchema {
  vendorType: string
  tabs: VendorTabSchema[]
}
