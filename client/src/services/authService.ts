import axios from 'axios'
import type { User, AuthResponse } from '@/types'

// Create a base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

// Automatically attach token to each request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Logs in a user and stores JWT token.
 */
const login = async (
  credentials: { email: string; password: string }
): Promise<User> => {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials)
  localStorage.setItem('token', data.token)
  return data.user
}

/**
 * Registers a user and stores JWT token.
 */
const register = async (userData: {
  name: string
  email: string
  password: string
  role: 'patient' | 'doctor' | 'admin'
}): Promise<User> => {
  const { data } = await api.post<AuthResponse>('/auth/register', userData)
  localStorage.setItem('token', data.token)
  return data.user
}

/**
 * Gets the currently authenticated user from the backend.
 */
const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/me')
  return data
}

/**
 * Logs the user out by removing the token.
 */
const logout = (): void => {
  localStorage.removeItem('token')
}

/**
 * Sends a password reset email.
 */
const forgotPassword = async (email: string): Promise<void> => {
  await api.post('/auth/forgotpassword', { email })
}

/**
 * Resets the user password using a token.
 */
const resetPassword = async (
  token: string,
  passwords: { password: string; confirmPassword: string }
): Promise<void> => {
  await api.put(`/auth/resetpassword/${token}`, passwords)
}

const authService = {
  login,
  register,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
}

export default authService
export { api } // Exporting for use in other services
