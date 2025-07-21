import type { Doctor } from '@/types'
import { Link } from 'react-router-dom'

interface DoctorCardProps {
  doctor: Doctor
  onEdit?: () => void
  onDelete?: () => void
}

const DoctorCard = ({ doctor, onEdit, onDelete }: DoctorCardProps) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h3 className="card-title">{doctor.user.name}</h3>
        <p>Specialization: {doctor.specialization}</p>
        <p>Qualifications: {doctor.qualifications.join(', ')}</p>
        <div className="card-actions justify-end">
          <Link to={`/doctors/${doctor._id}`} className="btn btn-sm btn-primary">
            View
          </Link>
          {onEdit && (
            <button className="btn btn-sm btn-secondary" onClick={onEdit}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="btn btn-sm btn-error" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
