import type { Doctor } from '@/types'

interface DoctorProfileProps {
  doctor: Doctor
}

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl">{doctor.name}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">Specialization</h3>
            <p>{doctor.specialization}</p>
          </div>
          <div>
            <h3 className="font-bold">Qualifications</h3>
            <ul className="list-disc pl-5">
              {doctor.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Available Slots</h3>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.map((slot, index) => (
                <span key={index} className="badge badge-primary">
                  {slot}
                </span>
              ))}
            </div>
          </div>
          {typeof doctor.clinic !== 'string' && (
            <div>
              <h3 className="font-bold">Clinic</h3>
              <p>{doctor.clinic.name}</p>
              <p>{doctor.clinic.address}</p>
              <p>{doctor.clinic.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
