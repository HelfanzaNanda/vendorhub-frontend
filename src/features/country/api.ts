import { api } from '@/services/api'
import type { ApiResponse } from '@/services/api'
import type { Country, CountryFilters, PaginatedCountries } from './types'
import type { CountryFormInput } from './schema'

export const countryApi = {
  getCountries: async (filters: CountryFilters): Promise<ApiResponse<PaginatedCountries>> => {
    return api.get<PaginatedCountries>('/countries', filters)
  },

  getCountryById: async (id: string | number): Promise<ApiResponse<Country>> => {
    return api.get<Country>(`/countries/${id}`)
  },

  createCountry: async (data: CountryFormInput): Promise<ApiResponse<Country>> => {
    return api.post<Country>('/countries', data)
  },

  updateCountry: async (id: string | number, data: CountryFormInput): Promise<ApiResponse<Country>> => {
    return api.put<Country>(`/countries/${id}`, data)
  },

  deleteCountry: async (id: string | number): Promise<ApiResponse<null>> => {
    return api.delete<null>(`/countries/${id}`)
  },
}
