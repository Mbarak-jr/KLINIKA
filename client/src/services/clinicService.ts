import api from './api'
import type { Clinic } from '@/types'

const getClinics = async (): Promise<Clinic[]> => {
  const { data } = await api.get<Clinic[]>('/clinics')
  return data
}

const createClinic = async (
  clinicData: Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Clinic> => {
  const { data } = await api.post<Clinic>('/clinics', clinicData)
  return data
}

const updateClinic = async (
  id: string,
  updateData: Partial<Clinic>
): Promise<Clinic> => {
  const { data } = await api.put<Clinic>(`/clinics/${id}`, updateData)
  return data
}

const deleteClinic = async (id: string): Promise<void> => {
  await api.delete(`/clinics/${id}`)
}

export default {
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic
}
