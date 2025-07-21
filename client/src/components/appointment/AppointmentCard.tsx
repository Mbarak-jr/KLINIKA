import { format } from 'date-fns'
import type { Appointment } from '@/types'

interface AppointmentCardProps {
  appointment: Appointment
  onEdit?: () => void
  onCancel?: () => void
  role?: string // Accept the role
}

const AppointmentCard = ({ appointment, onEdit, onCancel, role }: AppointmentCardProps) => {
  const doctorName =
    typeof appointment.doctor === 'string'
      ? 'Unknown Doctor'
      : appointment.doctor.user.name

  const clinicName =
    typeof appointment.clinic === 'string'
      ? 'Unknown Clinic'
      : appointment.clinic.name

  const formattedDate = format(new Date(appointment.date), 'MMM dd, yyyy')

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h3 className="card-title">{doctorName}</h3>
        <p>{clinicName}</p>
        <p>
          {formattedDate} at {appointment.time}
        </p>
        <p>Status: {appointment.status}</p>
        {appointment.notes && <p>Notes: {appointment.notes}</p>}
        <div className="card-actions justify-end">
          {/* Only show edit/cancel if user is admin or patient */}
          {(role === 'admin' || role === 'patient') && (
            <>
              {onEdit && (
                <button className="btn btn-sm btn-primary" onClick={onEdit}>
                  Edit
                </button>
              )}
              {onCancel && (
                <button className="btn btn-sm btn-error" onClick={onCancel}>
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
