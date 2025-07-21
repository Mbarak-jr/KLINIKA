import { useEffect } from 'react'
import { useClinics } from '@/hooks/useClinics'
import { useDoctors } from '@/hooks/useDoctors'
import DashboardStats from '@/components/dashboard/DashboardStats'
import ClinicList from '@/components/clinic/ClinicList'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { useAutoLogout } from '@/hooks/useAutoLogout'

const AdminDashboard = () => {
  const { clinics, fetchClinics } = useClinics()
  const { doctors, fetchDoctors } = useDoctors()
  
  // Add auto-logout functionality
  useAutoLogout();

  useEffect(() => {
    fetchClinics()
    fetchDoctors()
  }, [fetchClinics, fetchDoctors])

  return (
    <div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <Sidebar />
      
      <main className="flex-grow p-4 md:p-8 md:ml-64 mt-16 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <DashboardStats
          stats={{
            appointments: 0, // Replace 0 with real counts
            patients: 0,
            doctors: doctors.length,
            clinics: clinics.length,
          }}
          role="admin"
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Clinics</h2>
            <ClinicList
              clinics={clinics}
              onEdit={(clinic) => console.log('Edit', clinic)}
              onDelete={(id) => console.log('Delete', id)}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Doctors</h2>
            {/* TODO: Add DoctorList component here */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard