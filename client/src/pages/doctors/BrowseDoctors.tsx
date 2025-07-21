import React from 'react'
import { useDoctors } from '@/hooks/useDoctors'
import DoctorList from '@/components/doctor/DoctorList'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const BrowseDoctors = () => {
  const { doctors, fetchDoctors } = useDoctors()

  React.useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Browse Doctors</h1>
          <DoctorList doctors={doctors} />
        </main>
      </div>
    </div>
  )
}

export default BrowseDoctors
