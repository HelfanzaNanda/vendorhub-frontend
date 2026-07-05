import { useQuery } from '@tanstack/react-query'

import { lookupService } from '../services/lookup.service'
import type { FieldOption } from '../schemas/types'

/**
 * Generic hook to fetch lookup options from /lookups/{module}
 * Returns FieldOption[] { label, value, data } for use in select/multi-select/autocomplete fields.
 */
export function useLookup(module: string | undefined, params?: Record<string, any>): {
  options: FieldOption[]
  isLoading: boolean
} {
  const query = useQuery({
    queryKey: ['lookups', module, params],
    queryFn: () => lookupService.getLookup(module!, params),
    enabled: !!module,
    staleTime: 5 * 60 * 1000, // Cache lookups for 5 minutes
  })

  return {
    options: query.data || [],
    isLoading: query.isLoading,
  }
}
