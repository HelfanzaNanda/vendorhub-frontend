import { api } from '@/services/api'
import type { FieldOption } from '../schemas/types'

export interface LookupItem {
  label: string
  value: string | number
}

/**
 * Fetches lookup options from /lookups/{module}
 * The API is expected to return { data: { label, value }[] }
 */
export const lookupService = {
  getLookup: async (module: string): Promise<FieldOption[]> => {
    try {
      const response = await api.get<LookupItem[]>(`/lookups/${module}`)

      // Handle both { data: [...] } and bare array responses
      const items = Array.isArray(response.data)
        ? response.data
        : (response as any)?.data?.data || []

      return items.map((item: any) => ({
        label: item.label ?? item.name ?? String(item.value),
        value: item.value ?? item.id ?? item.code,
      }))
    } catch {
      return []
    }
  },
}
