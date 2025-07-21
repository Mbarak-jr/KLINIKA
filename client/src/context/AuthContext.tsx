import { createContext } from 'react'
import type { User } from '@/types'

export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (userData: {
    name: string
    email: string
    password: string
    role: 'patient' | 'doctor' | 'admin'
  }) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (
    token: string,
    passwords: { password: string; confirmPassword: string }
  ) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
