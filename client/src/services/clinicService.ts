// src/services/clinicService.ts
import api from './api'
import type { Clinic } from '@/types'

export const getClinics = async (): Promise<Clinic[]> => {
  const { data } = await api.get<Clinic[]>('/clinics')
  return data
}

export const createClinic = async (
  clinicData: Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Clinic> => {
  const { data } = await api.post<Clinic>('/clinics', clinicData)
  return data
}

export const updateClinic = async (
  id: string,
  updateData: Partial<Clinic>
): Promise<Clinic> => {
  const { data } = await api.put<Clinic>(`/clinics/${id}`, updateData)
  return data
}

export const deleteClinic = async (id: string): Promise<void> => {
  await api.delete(`/clinics/${id}`)
}

// ✅ Export all as default so you can use: import clinicService from '@/services/clinicService'
export default {
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic
}
