import { useState, useEffect, type ReactNode } from 'react'
import clinicService from '@/services/clinicService'
import { ClinicContext } from '@/context/ClinicContext'
import type { Clinic } from '@/types'

export const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load clinics on mount
  useEffect(() => {
    const loadClinics = async () => {
      try {
        setLoading(true)
        const data = await clinicService.getClinics()
        setClinics(data)
      } catch {
        setError('Failed to fetch clinics')
      } finally {
        setLoading(false)
      }
    }

    loadClinics()
  }, [])

  const fetchClinics = async () => {
    setLoading(true)
    try {
      const data = await clinicService.getClinics()
      setClinics(data)
    } catch {
      setError('Failed to fetch clinics')
    } finally {
      setLoading(false)
    }
  }

  const createClinic = async (
    clinicData: Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>
  ) => {
    setLoading(true)
    try {
      const newClinic = await clinicService.createClinic(clinicData)
      setClinics(prev => [...prev, newClinic])
    } catch {
      setError('Failed to create clinic')
    } finally {
      setLoading(false)
    }
  }

  const updateClinic = async (id: string, updateData: Partial<Clinic>) => {
    setLoading(true)
    try {
      const updatedClinic = await clinicService.updateClinic(id, updateData)
      setClinics(prev =>
        prev.map(c => (c._id === id ? updatedClinic : c))
      )
    } catch {
      setError('Failed to update clinic')
    } finally {
      setLoading(false)
    }
  }

  const deleteClinic = async (id: string) => {
    setLoading(true)
    try {
      await clinicService.deleteClinic(id)
      setClinics(prev => prev.filter(c => c._id !== id))
    } catch {
      setError('Failed to delete clinic')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ClinicContext.Provider
      value={{
        clinics,
        loading,
        error,
        fetchClinics,
        createClinic,
        updateClinic,
        deleteClinic
      }}
    >
      {children}
    </ClinicContext.Provider>
  )
}
