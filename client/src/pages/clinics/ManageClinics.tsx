import { useState, useEffect } from 'react'
import type { Clinic } from '@/types'
import { useClinics } from '@/hooks/useClinics'
import ClinicList from '@/components/clinic/ClinicList'
import ClinicForm from '@/components/clinic/ClinicForm'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

// Define a type for the form values (all except _id, createdAt, updatedAt)
type ClinicFormValues = Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>

const ManageClinics = () => {
  const { clinics, createClinic, updateClinic, deleteClinic, fetchClinics } = useClinics()
  const [showForm, setShowForm] = useState(false)
  const [currentClinic, setCurrentClinic] = useState<Clinic | null>(null)

  useEffect(() => {
    fetchClinics()
  }, [fetchClinics])

  const handleSubmit = async (values: ClinicFormValues) => {
    try {
      if (currentClinic?._id) {
        await updateClinic(currentClinic._id, values)
      } else {
        await createClinic(values)
      }
      setShowForm(false)
      setCurrentClinic(null)
      await fetchClinics()
    } catch (error) {
      console.error('Error saving clinic:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteClinic(id)
      await fetchClinics()
    } catch (error) {
      console.error('Error deleting clinic:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Clinics</h1>
            <Button onClick={() => setShowForm(true)}>Add Clinic</Button>
          </div>
          <ClinicList
            clinics={clinics}
            onEdit={(clinic) => {
              setCurrentClinic(clinic)
              setShowForm(true)
            }}
            onDelete={handleDelete}
          />
          <Modal
            isOpen={showForm}
            onClose={() => {
              setShowForm(false)
              setCurrentClinic(null)
            }}
            title={currentClinic?._id ? 'Edit Clinic' : 'Add Clinic'}
          >
            <ClinicForm
              initialValues={currentClinic || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setCurrentClinic(null)
              }}
            />
          </Modal>
        </main>
      </div>
    </div>
  )
}

export default ManageClinics
