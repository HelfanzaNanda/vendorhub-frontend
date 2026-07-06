export interface VendorInfo {
  id: number
  vendorCode: string | null
  companyName: string | null
  vendorStatus: string | null
}

export interface User {
  id: number
  firstname: string
  lastname: string
  username: string
  email: string
  type: string
  vendor: VendorInfo | null
}

export interface Role {
  id: number
  code: string
  name: string
}

export interface Menu {
  id: number
  name: string
  path: string | null
  icon: string | null
  parentId: number | null
  order: number
  children?: Menu[]
}

export interface AuthProfileResponse {
  user: User
  defaultRole: { code: string; name: string } | null
  roles: Role[]
  permissions: string[]
  menus: Menu[]
}

export interface AuthResponseData {
  accessToken: string
  refreshToken: string
}
