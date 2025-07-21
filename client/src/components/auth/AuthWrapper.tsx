import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface AuthWrapperProps {
  children: ReactNode
  requireAuth?: boolean
  allowedRoles?: Array<'patient' | 'doctor' | 'admin'>
}

const AuthWrapper = ({
  children,
  requireAuth = true,
  allowedRoles,
}: AuthWrapperProps) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />
  }

  if (requireAuth && allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  if (!requireAuth && user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AuthWrapper
