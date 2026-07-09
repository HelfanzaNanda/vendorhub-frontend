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
  id?: string | number
  vendorId?: string | number
  termsConditionId?: string | number
  vendorName?: string
  authorizedSignatory?: string
  position?: string
  supportingDocument?: { id: number; filename: string } | null
  signedDocument?: { id: number; filename: string } | null
  chapterReviews?: Record<string, { status: string; reason?: string }>
  status?: string
}

export interface VendorTermsResponse {
  termsCondition: any // We use the master terms from /terms-conditions/latest instead
  submission: VendorTermsCondition | null
}

export interface SubmitVendorTermsPayload {
  termsConditionId: { id: string | number }
  vendorName?: string
  authorizedSignatory: string
  position: string
  supportingDocumentId: any
  signedDocumentId: any
  chapterReviews: Record<string, any>
}

export const termsService = {
  getVendorTerms: async (): Promise<VendorTermsResponse | null> => {
    try {
      const response = await api.get<any>('/vendor/terms-conditions')

      
return response.data?.data || response.data || null
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }

      throw error
    }
  },

  submitVendorTerms: async (data: SubmitVendorTermsPayload): Promise<VendorTermsCondition> => {
    const response = await api.post<any>('/vendor/terms-conditions', data)

    
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
