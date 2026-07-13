import { api } from '@/services/api'

export const submitWorklistApi = {
  getVendorCategories: async () => {
    return api.get('/lookups/vendor-categories')
  },

  getVendorCategoryItems: async (categoryId: string) => {
    return api.get(`/lookups/vendor-category-items`, { categoryId })
  },

  submit: async (workflowTransactionId: string, payload: any) => {
    return api.post(`/worklists/${workflowTransactionId}/submit`, payload)
  }
}
