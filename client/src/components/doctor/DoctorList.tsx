import type { Doctor } from '@/types'
import DoctorCard from './DoctorCard'

interface DoctorListProps {
  doctors: Doctor[]
  onEdit?: (doctor: Doctor) => void
  onDelete?: (id: string) => void
}

const DoctorList = ({ doctors, onEdit, onDelete }: DoctorListProps) => {
  return (
    <div className="space-y-4">
      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onEdit={onEdit ? () => onEdit(doctor) : undefined}
            onDelete={onDelete ? () => onDelete(doctor._id) : undefined}
          />
        ))
      )}
    </div>
  )
}

export default DoctorList
