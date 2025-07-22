import api from './api'
import type { User, AuthResponse } from '@/types'

const login = async (
  credentials: { email: string; password: string }
): Promise<User> => {
  try {
    console.log('🔐 Attempting login...')
    const { data } = await api.post<AuthResponse>('/auth/login', credentials, {
      withCredentials: true,
    })

    console.log('✅ Login successful, user received')
    return data.user
  } catch (error) {
    console.error('❌ Login failed:', error)
    throw error
  }
}

const register = async (userData: {
  name: string
  email: string
  password: string
  role: 'patient' | 'doctor' | 'admin'
}): Promise<User> => {
  try {
    console.log('📝 Attempting registration...')
    const { data } = await api.post<AuthResponse>('/auth/register', userData, {
      withCredentials: true,
    })

    console.log('✅ Registration successful, user received')
    return data.user
  } catch (error) {
    console.error('❌ Registration failed:', error)
    throw error
  }
}

const getMe = async (): Promise<User> => {
  try {
    console.log('👤 Fetching current user...')
    const { data } = await api.get<User>('/auth/me', {
      withCredentials: true,
    })

    console.log('✅ User fetched successfully')
    return data
  } catch (error) {
    console.error('❌ Failed to get current user:', error)
    throw error
  }
}

const logout = async (): Promise<void> => {
  try {
    console.log('🚪 Logging out user...')
    await api.post('/auth/logout', {}, { withCredentials: true })
    console.log('✅ User logged out successfully')
  } catch (error) {
    console.error('❌ Logout failed:', error)
    throw error
  }
}

const forgotPassword = async (email: string): Promise<void> => {
  try {
    console.log('📧 Sending password reset email...')
    await api.post('/auth/forgotpassword', { email })
    console.log('✅ Password reset email sent')
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error)
    throw error
  }
}

const resetPassword = async (
  token: string,
  passwords: { password: string; confirmPassword: string }
): Promise<void> => {
  try {
    console.log('🔑 Resetting password...')
    await api.put(`/auth/resetpassword/${token}`, passwords)
    console.log('✅ Password reset successful')
  } catch (error) {
    console.error('❌ Password reset failed:', error)
    throw error
  }
}

// Always assume authenticated status must be verified via backend when using cookies
const isAuthenticated = async (): Promise<boolean> => {
  try {
    await getMe()
    return true
  } catch {
    return false
  }
}

const authService = {
  login,
  register,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
  isAuthenticated,
}

export default authService
