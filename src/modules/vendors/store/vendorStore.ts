import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VendorState {
  vendorType: 'local' | 'foreign' | 'individual'
  formDrafts: Record<string, any> // Keyed by tab ID (e.g. 'vendor_company')

  setVendorType: (type: 'local' | 'foreign' | 'individual') => void
  saveDraft: (tabId: string, data: any) => void
  clearDrafts: () => void
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set) => ({
      vendorType: 'local',
      formDrafts: {},

      setVendorType: (type) => set({ vendorType: type }),
      
      saveDraft: (tabId, data) =>
        set((state) => ({
          formDrafts: {
            ...state.formDrafts,
            [tabId]: { ...state.formDrafts[tabId], ...data },
          },
        })),

      clearDrafts: () => set({ formDrafts: {}, vendorType: 'local' }),
    }),
    {
      name: 'vendor-registration-drafts',
    }
  )
)
