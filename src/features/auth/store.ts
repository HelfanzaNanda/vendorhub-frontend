import { create } from 'zustand'
import Cookies from 'js-cookie'

import type { User } from './types'

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token'
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (user: User | null, accessToken: string, refreshToken: string, rememberMe?: boolean) => void
  setUser: (user: User | null) => void
  clearAuth: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, accessToken, refreshToken, rememberMe = false) => {
    const cookieOptions = rememberMe ? { expires: 30 } : {} // 30 days or session
    
    Cookies.set(TOKEN_KEY, accessToken, cookieOptions)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    set({
      user,
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
    })
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  },

  clearAuth: () => {
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    localStorage.removeItem('user')

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
  },

  initializeAuth: () => {
    const token = Cookies.get(TOKEN_KEY) || null
    const storedUser = localStorage.getItem('user')

    if (token) {
      let user: User | null = null

      if (storedUser) {
        try {
          user = JSON.parse(storedUser) as User
        } catch (e) {
          localStorage.removeItem('user')
        }
      }

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: !user, // Keep loading true if token exists but user needs to be fetched
      })
    } else {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },
}))
