import axios from 'axios'
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import type { ApiError } from '@/types'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token && config.headers?.set) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as {
        message?: string
        errors?: Record<string, string>
      }

      const apiError: ApiError = {
        message: data.message || 'An error occurred',
        statusCode: error.response.status,
        errors: data.errors,
      }

      return Promise.reject(apiError)
    }

    return Promise.reject(error)
  }
)

export default api
