export const COUNTRY_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  SORT_FIELD: 'name',
  SORT_ORDER: 'asc' as const,
}

export const COUNTRY_QUERY_KEYS = {
  all: ['countries'] as const,
  lists: () => [...COUNTRY_QUERY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...COUNTRY_QUERY_KEYS.lists(), filters] as const,
  details: () => [...COUNTRY_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string | number) => [...COUNTRY_QUERY_KEYS.details(), id] as const,
}
