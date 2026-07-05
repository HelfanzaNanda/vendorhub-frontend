import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VendorState {
  vendorId: string | null
  vendorType: 'local' | 'foreign' | 'individual'
  formDrafts: Record<string, any> // Keyed by tab ID (e.g. 'vendor_company')

  setVendorId: (id: string | null) => void
  setVendorType: (type: 'local' | 'foreign' | 'individual') => void
  saveDraft: (tabId: string, data: any) => void
  clearDrafts: () => void
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set) => ({
      vendorId: null,
      vendorType: 'local',
      formDrafts: {},

      setVendorId: (id) => set({ vendorId: id }),
      setVendorType: (type) => set({ vendorType: type }),
      
      saveDraft: (tabId, data) =>
        set((state) => ({
          formDrafts: {
            ...state.formDrafts,
            [tabId]: { ...state.formDrafts[tabId], ...data },
          },
        })),

      clearDrafts: () => set({ vendorId: null, formDrafts: {}, vendorType: 'local' }),
    }),
    {
      name: 'vendor-registration-drafts',
    }
  )
)
