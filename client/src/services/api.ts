import axios from 'axios';
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import type { ApiError } from '@/types';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // send cookies
});

// No need for token injection anymore
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized – maybe token expired or not sent');
    }

    if (error.response) {
      const data = error.response.data as {
        message?: string;
        errors?: Record<string, string>;
      };

      const apiError: ApiError = {
        message: data.message || 'An error occurred',
        statusCode: error.response.status,
        errors: data.errors,
      };

      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  }
);

export default api;
