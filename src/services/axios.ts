import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token'
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Inject Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_KEY)

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })

  failedQueue = []
}

// Response Interceptor: Handle Token Expired (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`

            return apiClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)

      if (!refreshToken) {
        isRefreshing = false

        // Redirect to login if no refresh token exists
        if (typeof window !== 'undefined') {
          Cookies.remove(TOKEN_KEY)
          Cookies.remove(REFRESH_TOKEN_KEY)
          window.location.href = '/login'
        }

        return Promise.reject(error)
      }

      try {
        // Mock token refresh endpoint or real one
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data.data

        // Save new tokens
        Cookies.set(TOKEN_KEY, accessToken)

        if (newRefreshToken) {
          Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken)
        }

        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        processQueue(null, accessToken)
        isRefreshing = false

        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        isRefreshing = false

        // Clear cookies and redirect
        if (typeof window !== 'undefined') {
          Cookies.remove(TOKEN_KEY)
          Cookies.remove(REFRESH_TOKEN_KEY)
          window.location.href = '/login'
        }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
