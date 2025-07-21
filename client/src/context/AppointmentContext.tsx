
import { createContext } from 'react'
import type { Appointment } from '@/types'

export interface AppointmentFilters {
  doctorId?: string
  patientId?: string
  status?: string
  date?: string
}

export interface AppointmentContextType {
  appointments: Appointment[]
  loading: boolean
  error: string | null
  fetchAppointments: (filters?: AppointmentFilters) => Promise<void>
  createAppointment: (
    appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  updateAppointment: (id: string, updateData: Partial<Appointment>) => Promise<void>
  cancelAppointment: (id: string) => Promise<void>
}

export const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)
