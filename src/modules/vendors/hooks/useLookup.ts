import { useQuery } from '@tanstack/react-query'

import { lookupService } from '../services/lookup.service'
import type { FieldOption } from '../schemas/types'

/**
 * Generic hook to fetch lookup options from /lookups/{module}
 * Returns FieldOption[] { label, value } for use in select/multi-select fields.
 */
export function useLookup(module: string | undefined): {
  options: FieldOption[]
  isLoading: boolean
} {
  const query = useQuery({
    queryKey: ['lookups', module],
    queryFn: () => lookupService.getLookup(module!),
    enabled: !!module,
    staleTime: 5 * 60 * 1000, // Cache lookups for 5 minutes
  })

  return {
    options: query.data || [],
    isLoading: query.isLoading,
  }
}
