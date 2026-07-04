export interface User {
  id: string
  email: string
  name: string
  role?: string
}

export interface AuthResponseData {
  user: User
  accessToken: string
  refreshToken: string
}
