import { useRouter } from 'next/navigation'

import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authApi } from './api'
import { useAuthStore } from './store'
import type { LoginInput, RegisterInput } from './schema'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response: any) => {
      // Defensively parse wrapped or raw token payload structures
      const data = response?.data || response
      const accessToken = data?.accessToken || data?.token || null
      const refreshToken = data?.refreshToken || null

      if (!accessToken) {
        toast.error('Token not found in login response')

        return
      }

      setAuth(accessToken, refreshToken)
      toast.success(response?.message || 'Logged in successfully!')
      router.push('/dashboard')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Login failed. Please check your credentials.'

      toast.error(message)
    },
  })
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (response: any) => {
      toast.success(response?.message || 'Registration successful! Please login.')
      router.push('/login')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Registration failed.'

      toast.error(message)
    },
  })
}

export const useProfile = (enabled = true) => {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authApi.getCurrentProfile(),
    retry: false,
    enabled,
    select: (response: any) => {
      return response?.data || response
    },
  })
}
