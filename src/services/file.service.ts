import { api } from './api'
import type { ApiResponse } from './api'

export interface FileData {
  id: number
  filename: string
  originalname: string
  mimetype: string
  size: number
  path: string
}

export const fileService = {
  upload: async (
    file: File, 
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<FileData>> => {
    const formData = new FormData()
    formData.append('file', file)

    return api.post<FileData>('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  },
}
