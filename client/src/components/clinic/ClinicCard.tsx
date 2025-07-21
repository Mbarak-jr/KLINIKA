import type { Clinic } from '@/types'
import { Link } from 'react-router-dom'

interface ClinicCardProps {
  clinic: Clinic
  onEdit?: () => void
  onDelete?: () => void
}

const ClinicCard = ({ clinic, onEdit, onDelete }: ClinicCardProps) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h3 className="card-title">{clinic.name}</h3>
        <p>Address: {clinic.address}</p>
        <p>Phone: {clinic.phone}</p>
        <div className="card-actions justify-end">
          <Link to={`/clinics/${clinic._id}`} className="btn btn-sm btn-primary">
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

export default ClinicCard
