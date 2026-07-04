export interface Country {
  id: string | number
  name: string
  iso2Code: string
  phoneCode?: string
  createdAt?: string
  updatedAt?: string
}

export interface CountryFilters {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  [key: string]: any
}

export interface PaginatedCountries {
  countries: Country[]
  total: number
  page: number
  limit: number
  totalPages: number
}
