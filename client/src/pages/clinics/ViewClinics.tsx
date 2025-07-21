import { useEffect } from 'react'
import { useClinics } from '@/hooks/useClinics'
import ClinicList from '@/components/clinic/ClinicList'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const ViewClinics = () => {
  const { clinics, fetchClinics } = useClinics()

  useEffect(() => {
    fetchClinics()
  }, [fetchClinics])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Clinics</h1>
          <ClinicList clinics={clinics} />
        </main>
      </div>
    </div>
  )
}

export default ViewClinics
