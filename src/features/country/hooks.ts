import { useRouter } from 'next/navigation'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { countryApi } from './api'
import { COUNTRY_QUERY_KEYS } from './constants'
import type { CountryFilters } from './types'
import type { CountryFormInput } from './schema'

export const useCountries = (filters: CountryFilters) => {
  return useQuery({
    queryKey: COUNTRY_QUERY_KEYS.list(filters),
    queryFn: () => countryApi.getCountries(filters),
    select: (response: any) => {
      const payload = response?.data || response

      return {
        countries: payload?.data || [],
        total: payload?.meta?.total || 0,
        page: payload?.meta?.page || 1,
        limit: payload?.meta?.limit || 10,
        totalPages: payload?.meta?.totalPage || 0,
      }
    },
  })
}

export const useCountry = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: COUNTRY_QUERY_KEYS.detail(id),
    queryFn: () => countryApi.getCountryById(id),
    enabled: enabled && !!id,
    select: (response: any) => {
      return response?.data || response
    },
  })
}

export const useCreateCountry = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: CountryFormInput) => countryApi.createCountry(data),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: COUNTRY_QUERY_KEYS.all })
      toast.success(response?.message || 'Country created successfully')
      router.push('/master/countries')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to create country'

      toast.error(message)
    },
  })
}

export const useUpdateCountry = (id: string | number) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: CountryFormInput) => countryApi.updateCountry(id, data),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: COUNTRY_QUERY_KEYS.all })
      queryClient.invalidateQueries({ queryKey: COUNTRY_QUERY_KEYS.detail(id) })
      toast.success(response?.message || 'Country updated successfully')
      router.push(`/master/countries/${id}`)
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to update country'

      toast.error(message)
    },
  })
}

export const useDeleteCountry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | number) => countryApi.deleteCountry(id),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: COUNTRY_QUERY_KEYS.all })
      toast.success(response?.message || 'Country deleted successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete country'

      toast.error(message)
    },
  })
}
