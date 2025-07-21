// src/context/clinic/ClinicContext.ts
import { createContext } from 'react'
import type { Clinic } from '@/types'

export interface ClinicContextType {
  clinics: Clinic[]
  loading: boolean
  error: string | null
  fetchClinics: () => Promise<void>
  createClinic: (clinicData: Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateClinic: (id: string, updateData: Partial<Clinic>) => Promise<void>
  deleteClinic: (id: string) => Promise<void>
}

export const ClinicContext = createContext<ClinicContextType | undefined>(undefined)
