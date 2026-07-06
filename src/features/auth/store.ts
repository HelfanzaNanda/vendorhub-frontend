import { create } from 'zustand'
import Cookies from 'js-cookie'

import type { User, Role, Menu, AuthProfileResponse } from './types'

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token'
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token'

interface AuthStore {
  user: User | null
  defaultRole: { code: string; name: string } | null
  roles: Role[]
  permissions: string[]
  menus: Menu[]
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (accessToken: string, refreshToken: string, rememberMe?: boolean) => void
  setUser: (profile: AuthProfileResponse | null) => void
  clearAuth: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  defaultRole: null,
  roles: [],
  permissions: [],
  menus: [],
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (accessToken, refreshToken, rememberMe = false) => {
    const cookieOptions = rememberMe ? { expires: 30 } : {} // 30 days or session
    
    Cookies.set(TOKEN_KEY, accessToken, cookieOptions)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions)

    set({
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
    })
  },

  setUser: (profile) => {
    if (profile) {
      localStorage.setItem('auth_profile', JSON.stringify(profile))
      set({
        user: profile.user,
        defaultRole: profile.defaultRole,
        roles: profile.roles,
        permissions: profile.permissions,
        menus: profile.menus,
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      localStorage.removeItem('auth_profile')
      set({
        user: null,
        defaultRole: null,
        roles: [],
        permissions: [],
        menus: [],
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  clearAuth: () => {
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    localStorage.removeItem('auth_profile')

    set({
      user: null,
      defaultRole: null,
      roles: [],
      permissions: [],
      menus: [],
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
  },

  initializeAuth: () => {
    const token = Cookies.get(TOKEN_KEY) || null
    const storedProfile = localStorage.getItem('auth_profile')

    if (token) {
      let profile: AuthProfileResponse | null = null

      if (storedProfile) {
        try {
          profile = JSON.parse(storedProfile) as AuthProfileResponse
        } catch (e) {
          localStorage.removeItem('auth_profile')
        }
      }

      set({
        user: profile?.user || null,
        defaultRole: profile?.defaultRole || null,
        roles: profile?.roles || [],
        permissions: profile?.permissions || [],
        menus: profile?.menus || [],
        token,
        isAuthenticated: true,
        isLoading: !profile, // Keep loading true if token exists but profile needs to be fetched
      })
    } else {
      set({
        user: null,
        defaultRole: null,
        roles: [],
        permissions: [],
        menus: [],
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },
}))
