import api from './api' // ✅ use your configured Axios instance
import type { Appointment } from '@/types'

const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>('/appointments')
  return Array.isArray(data) ? data : [] // ✅ ensure it's an array
}

const getAppointmentById = async (id: string): Promise<Appointment> => {
  const { data } = await api.get<Appointment>(`/appointments/${id}`)
  return data
}

const createAppointment = async (
  appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Appointment> => {
  const { data } = await api.post<Appointment>('/appointments', appointmentData)
  return data
}

const updateAppointment = async (
  id: string,
  updateData: Partial<Appointment>
): Promise<Appointment> => {
  const { data } = await api.put<Appointment>(`/appointments/${id}`, updateData)
  return data
}

const cancelAppointment = async (id: string): Promise<void> => {
  await api.delete(`/appointments/${id}`)
}

export default {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
}
