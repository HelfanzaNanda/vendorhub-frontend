import { create } from 'zustand'

interface LoadingState {
  globalLoading: boolean
  setGlobalLoading: (isLoading: boolean) => void
  loadingItems: Record<string, boolean>
  setLoadingItem: (key: string, isLoading: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),
  loadingItems: {},
  setLoadingItem: (key, isLoading) =>
    set((state) => ({
      loadingItems: {
        ...state.loadingItems,
        [key]: isLoading,
      },
    })),
}))
