import type { Clinic } from '@/types'  // type-only import
import ClinicCard from './ClinicCard'

interface ClinicListProps {
  clinics: Clinic[]
  onEdit?: (clinic: Clinic) => void
  onDelete?: (id: string) => void
}

const ClinicList = ({ clinics, onEdit, onDelete }: ClinicListProps) => {
  return (
    <div className="space-y-4">
      {clinics.length === 0 ? (
        <p>No clinics found</p>
      ) : (
        clinics.map((clinic) => (
          <ClinicCard
            key={clinic._id}
            clinic={clinic}
            onEdit={onEdit ? () => onEdit(clinic) : undefined}
            onDelete={onDelete ? () => onDelete(clinic._id) : undefined}
          />
        ))
      )}
    </div>
  )
}

export default ClinicList
