import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Doctor } from '@/types'
import { useDoctors } from '@/hooks/useDoctors'
import DoctorProfile from '@/components/doctor/DoctorProfile'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { getDoctor } = useDoctors()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      if (id) {
        try {
          const data = await getDoctor(id)
          setDoctor(data)
        } catch (error) {
          console.error('Error fetching doctor:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchDoctor()
  }, [id, getDoctor])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <DoctorProfile doctor={doctor} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DoctorDetailPage
