// src/context/clinic/ClinicProvider.tsx
import { useState, useEffect, useRef, type ReactNode } from 'react'
import clinicService from '@/services/clinicService'
import { ClinicContext } from '@/context/ClinicContext'
import type { Clinic } from '@/types'
import { useAuth } from '@/hooks/useAuth' // ✅ Add auth hook

export const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth() // ✅ Get auth state
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!isAuthenticated || hasFetched.current) return // ✅ Guard

    const loadClinics = async () => {
      hasFetched.current = true
      setLoading(true)
      try {
        const data = await clinicService.getClinics()
        setClinics(data)
      } catch (err) {
        console.error('❌ Failed to fetch clinics:', err)
        setError('Failed to fetch clinics')
      } finally {
        setLoading(false)
      }
    }

    loadClinics()
  }, [isAuthenticated])

  const fetchClinics = async () => {
    setLoading(true)
    try {
      const data = await clinicService.getClinics()
      setClinics(data)
    } catch (err) {
      console.error('❌ Failed to fetch clinics:', err)
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
    } catch (err) {
      console.error('❌ Failed to create clinic:', err)
      setError('Failed to create clinic')
    } finally {
      setLoading(false)
    }
  }

  const updateClinic = async (id: string, updateData: Partial<Clinic>) => {
    setLoading(true)
    try {
      const updatedClinic = await clinicService.updateClinic(id, updateData)
      setClinics(prev => prev.map(c => (c._id === id ? updatedClinic : c)))
    } catch (err) {
      console.error('❌ Failed to update clinic:', err)
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
    } catch (err) {
      console.error('❌ Failed to delete clinic:', err)
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
        deleteClinic,
      }}
    >
      {children}
    </ClinicContext.Provider>
  )
}
