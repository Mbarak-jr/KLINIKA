import api from './api'
import type { Appointment } from '@/types'

/**
 * Fetch all appointments (admin or doctor).
 */
const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>('/appointments')
  return data
}

/**
 * Get a single appointment by ID.
 */
const getAppointmentById = async (id: string): Promise<Appointment> => {
  const { data } = await api.get<Appointment>(`/appointments/${id}`)
  return data
}

/**
 * Create a new appointment.
 */
const createAppointment = async (
  appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Appointment> => {
  const { data } = await api.post<Appointment>('/appointments', appointmentData)
  return data
}

/**
 * Update an existing appointment.
 */
const updateAppointment = async (
  id: string,
  updateData: Partial<Appointment>
): Promise<Appointment> => {
  const { data } = await api.put<Appointment>(`/appointments/${id}`, updateData)
  return data
}

/**
 * Cancel or delete an appointment.
 */
const cancelAppointment = async (id: string): Promise<void> => {
  await api.delete(`/appointments/${id}`)
}

const appointmentService = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment
}

export default appointmentService
