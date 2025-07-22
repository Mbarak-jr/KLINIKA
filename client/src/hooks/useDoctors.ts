import { useState, useCallback } from 'react'
import doctorService from '@/services/doctorService'
import type { Doctor } from '@/types'

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    try {
      const data = await doctorService.getDoctors()
      setDoctors(data)
    } catch {
      setError('Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }, [])

  const getDoctor = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const data = await doctorService.getDoctorById(id)
      return data
    } catch {
      setError('Failed to fetch doctor')
      throw new Error('Doctor fetch failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    getDoctor
  }
}
