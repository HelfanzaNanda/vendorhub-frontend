import { api } from '@/services/api'
import type { ApiResponse } from '@/services/api'
import type { LoginInput, RegisterInput } from './schema'
import type { AuthResponseData, AuthProfileResponse, User } from './types'

export const authApi = {
  login: async (input: LoginInput): Promise<ApiResponse<AuthResponseData>> => {
    return api.post<AuthResponseData>('/auth/login', input)
  },

  register: async (input: RegisterInput): Promise<ApiResponse<User>> => {
    return api.post<User>('/auth/signup', input)
  },

  getCurrentProfile: async (): Promise<ApiResponse<AuthProfileResponse>> => {
    return api.get<AuthProfileResponse>('/auth/me')
  },
}
