import type { WorklistFilters } from './types'
import { WorkflowCode } from './enums/workflow-code.enum'

export const WORKLIST_QUERY_KEYS = {
  all: ['worklists'] as const,
  summary: (workflowCode: WorkflowCode) => [...WORKLIST_QUERY_KEYS.all, 'summary', workflowCode] as const,
  lists: () => [...WORKLIST_QUERY_KEYS.all, 'list'] as const,
  list: (filters: WorklistFilters) => [...WORKLIST_QUERY_KEYS.lists(), filters] as const,
  details: () => [...WORKLIST_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string | number) => [...WORKLIST_QUERY_KEYS.details(), id] as const,
  histories: () => [...WORKLIST_QUERY_KEYS.all, 'histories'] as const,
  history: (id: string | number) => [...WORKLIST_QUERY_KEYS.histories(), id] as const,
}
