// src/context/clinic/useClinics.ts
import { useContext } from 'react'
import { ClinicContext, type ClinicContextType } from '@/context/ClinicContext'

export const useClinics = (): ClinicContextType => {
  const context = useContext(ClinicContext)
  if (!context) {
    throw new Error('useClinics must be used within a ClinicProvider')
  }
  return context
}
