import { api } from '@/services/api'

export const submitWorklistApi = {
  getVendorCategories: async () => {
    return api.get('/lookups/vendor-categories')
  },

  getVendorCategoryItems: async (vendorCategoryId: number) => {
    return api.get(`/lookups/vendor-category-items?vendorCategoryId=${vendorCategoryId}`)
  },

  submit: async (workflowTransactionId: string, payload: any) => {
    return api.post(`/worklists/${workflowTransactionId}/submit`, payload)
  }
}
