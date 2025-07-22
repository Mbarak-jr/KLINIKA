import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '@/services/authService'
import { AuthContext } from '@/context/AuthContext'
import type { User, ApiError } from '@/types'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialAuthChecked, setInitialAuthChecked] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const redirectToDashboard = useCallback((role: User['role']) => {
    const routes = {
      admin: '/admin-dashboard',
      doctor: '/doctor-dashboard',
      patient: '/patient-dashboard',
    }
    navigate(routes[role])
  }, [navigate])

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      setInitialAuthChecked(true)
      return
    }

    try {
      const userData = await authService.getMe()
      setUser(userData)

      const isDashboard = ['/admin-dashboard', '/doctor-dashboard', '/patient-dashboard']
      const isOnRoot = location.pathname === '/'

      if (!isDashboard.includes(location.pathname) && isOnRoot) {
        redirectToDashboard(userData.role)
      }
    } catch (err) {
      console.warn('❌ Auth check failed or token expired:', err)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
      setInitialAuthChecked(true)
    }
  }, [location.pathname, redirectToDashboard])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError(null)
      const userData = await authService.login(credentials)

      if (!userData?.role) {
        throw new Error('Login failed: Invalid server response')
      }

      setUser(userData)
      redirectToDashboard(userData.role)
    } catch (err) {
      const error = err as ApiError
      setError(error.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    role: 'patient' | 'doctor' | 'admin'
  }) => {
    try {
      setError(null)
      const registeredUser = await authService.register(userData)

      if (!registeredUser?.role) {
        throw new Error('Registration failed: Invalid server response')
      }

      setUser(registeredUser)
      redirectToDashboard(registeredUser.role)
    } catch (err) {
      const error = err as ApiError
      setError(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  const forgotPassword = async (email: string) => {
    try {
      setError(null)
      await authService.forgotPassword(email)
    } catch (err) {
      const error = err as ApiError
      setError(error.message || 'Failed to send reset email')
      throw error
    }
  }

  const resetPassword = async (
    token: string,
    passwords: { password: string; confirmPassword: string }
  ) => {
    try {
      setError(null)
      await authService.resetPassword(token, passwords)
      navigate('/login')
    } catch (err) {
      const error = err as ApiError
      setError(error.message || 'Password reset failed')
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || !initialAuthChecked,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
