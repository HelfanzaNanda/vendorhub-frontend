'use client'

import { useEffect } from 'react'

import { Backdrop, CircularProgress } from '@mui/material'
import { Toaster } from 'sonner'

import { useLoadingStore } from '@/store/loadingStore'
import { useAuthStore } from '@/features/auth/store'
import { useProfile } from '@/features/auth/hooks'
import QueryProvider from './QueryProvider'

function AuthSync({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const { data: profile, isSuccess, isError, isLoading: isQueryLoading } = useProfile(!!token && !user)

  useEffect(() => {
    if (isSuccess && profile) {
      setUser(profile)
    }
  }, [isSuccess, profile, setUser])

  useEffect(() => {
    if (isError) {
      clearAuth()
    }
  }, [isError, clearAuth])

  const isAuthLoading = isLoading || (!!token && !user && isQueryLoading)

  if (isAuthLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return <>{children}</>
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const globalLoading = useLoadingStore((state) => state.globalLoading)

  return (
    <QueryProvider>
      <AuthSync>
        {children}
        <Toaster position="top-right" richColors />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
          open={globalLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </AuthSync>
    </QueryProvider>
  )
}
