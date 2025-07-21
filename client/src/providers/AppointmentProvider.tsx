
import { useState, useCallback, useEffect } from 'react'
import { AppointmentContext, type AppointmentContextType } from '@/context/AppointmentContext'
import type { Appointment } from '@/types'
import type { ReactNode } from 'react'
import appointmentService from '@/services/appointmentService'

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await appointmentService.getAppointments()
      setAppointments(data)
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError('Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }, [])

  const createAppointment = useCallback(async (
    appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>
  ) => {
    setLoading(true)
    setError(null)
    try {
      const newAppointment = await appointmentService.createAppointment(appointmentData)
      setAppointments(prev => [...prev, newAppointment])
    } catch (err) {
      console.error('Error creating appointment:', err)
      setError('Failed to create appointment')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateAppointment = useCallback(async (
    id: string,
    updateData: Partial<Appointment>
  ) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await appointmentService.updateAppointment(id, updateData)
      setAppointments(prev =>
        prev.map(a => (a._id === id ? updated : a))
      )
    } catch (err) {
      console.error('Error updating appointment:', err)
      setError('Failed to update appointment')
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelAppointment = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await appointmentService.cancelAppointment(id)
      setAppointments(prev => prev.filter(a => a._id !== id))
    } catch (err) {
      console.error('Error canceling appointment:', err)
      setError('Failed to cancel appointment')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const contextValue: AppointmentContextType = {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment
  }

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  )
}
