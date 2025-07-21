import api from './api'
import type { Doctor, ScheduleSlot } from '@/types'

const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await api.get<Doctor[]>('/doctors')
  return data
}

const getDoctorById = async (id: string): Promise<Doctor> => {
  const { data } = await api.get<Doctor>(`/doctors/${id}`)
  return data
}

const getDoctorByUserId = async (userId: string): Promise<Doctor> => {
  const { data } = await api.get<Doctor>(`/doctors/user/${userId}`)
  return data
}

const createDoctor = async (
  doctorData: Omit<Doctor, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Doctor> => {
  const { data } = await api.post<Doctor>('/doctors', doctorData)
  return data
}

const updateDoctor = async (
  id: string,
  updateData: Partial<Doctor>
): Promise<Doctor> => {
  const { data } = await api.put<Doctor>(`/doctors/${id}`, updateData)
  return data
}

const updateDoctorSchedule = async (
  doctorId: string,
  schedule: ScheduleSlot[]
): Promise<Doctor> => {
  const { data } = await api.put<Doctor>(`/doctors/${doctorId}/schedule`, { schedule })
  return data
}

export default {
  getDoctors,
  getDoctorById,
  getDoctorByUserId,
  createDoctor,
  updateDoctor,
  updateDoctorSchedule
}
