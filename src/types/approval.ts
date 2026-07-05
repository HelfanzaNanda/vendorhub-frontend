export interface BaseApprovalData {
  id: string | number
  source: 'MASTER' | 'TEMP'
  action: 'CREATE' | 'UPDATE' | 'DELETE' | null
  masterId: number | null
  tempId: number | null
}
