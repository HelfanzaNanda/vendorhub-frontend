import { api } from '@/services/api'

export interface TermsChapter {
  id: string | number
  sortOrder: number
  chapter: string
  title: string
  content: string // HTML content
  approvalMode: 'AUTO' | 'REVIEW'
}

export interface MasterTerms {
  id: string | number
  title: string
  items: TermsChapter[]
}

export interface VendorTermsCondition {
  id: string | number
  vendorId?: string | number
  vendorName?: string
  authorizedSignatory?: string
  position?: string
  supportingDocumentId?: string | number
  signedDocumentId?: string | number
  status?: string
}

export const termsService = {
  getVendorTerms: async (): Promise<VendorTermsCondition | null> => {
    try {
      const response = await api.get<any>('/vendor/terms-condition')
      return response.data?.data || null
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  submitVendorTerms: async (data: any): Promise<VendorTermsCondition> => {
    // API placeholder until backend is ready
    const response = await api.post<any>('/vendor/terms-condition', data)
    return response.data?.data || response.data
  },

  getLatestMasterTerms: async (): Promise<MasterTerms | null> => {
    try {
      const response = await api.get<any>('/terms-conditions/latest')
      return response.data || null
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  }
}
