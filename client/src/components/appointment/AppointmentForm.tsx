import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useClinics } from '@/hooks/useClinics'
import { useDoctors } from '@/hooks/useDoctors'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import type { Appointment } from '@/types'

interface AppointmentFormProps {
  initialValues?: Partial<Appointment>
  onSubmit: (values: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
}

const AppointmentForm = ({ initialValues, onSubmit, onCancel }: AppointmentFormProps) => {
  const { clinics, fetchClinics } = useClinics()
  const { doctors, fetchDoctors } = useDoctors()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchClinics()
    fetchDoctors()
  }, [fetchClinics, fetchDoctors])

  const formik = useFormik({
    initialValues: {
      clinic: typeof initialValues?.clinic === 'string' ? initialValues.clinic : '',
      doctor: typeof initialValues?.doctor === 'string' ? initialValues.doctor : '',
      date: initialValues?.date || '',
      time: initialValues?.time || '',
      notes: initialValues?.notes || '',
    },
    validationSchema: Yup.object({
      clinic: Yup.string().required('Required'),
      doctor: Yup.string().required('Required'),
      date: Yup.string().required('Required'),
      time: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await onSubmit(values as Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Clinic */}
      <div>
        <label htmlFor="clinic" className="block text-sm font-medium text-gray-700">
          Clinic
        </label>
        <select
          id="clinic"
          name="clinic"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.clinic}
          className={`mt-1 block w-full px-4 py-2 rounded-md border ${
            formik.errors.clinic && formik.touched.clinic
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
          } shadow-sm focus:outline-none focus:ring-2`}
        >
          <option value="">Select a clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic._id} value={clinic._id}>
              {clinic.name}
            </option>
          ))}
        </select>
        {formik.touched.clinic && formik.errors.clinic && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.clinic}</p>
        )}
      </div>

      {/* Doctor */}
      <div>
        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
          Doctor
        </label>
        <select
          id="doctor"
          name="doctor"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.doctor}
          className={`mt-1 block w-full px-4 py-2 rounded-md border ${
            formik.errors.doctor && formik.touched.doctor
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
          } shadow-sm focus:outline-none focus:ring-2`}
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.user.name} - {doctor.specialization}
            </option>
          ))}
        </select>
        {formik.touched.doctor && formik.errors.doctor && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.doctor}</p>
        )}
      </div>

      {/* Date */}
      <Input
        label="Date"
        id="date"
        name="date"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
        error={formik.touched.date && formik.errors.date ? formik.errors.date : undefined}
      />

      {/* Time */}
      <Input
        label="Time"
        id="time"
        name="time"
        type="time"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.time}
        error={formik.touched.time && formik.errors.time ? formik.errors.time : undefined}
      />

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.notes}
          className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-gray-500 focus:border-gray-500 shadow-sm focus:outline-none focus:ring-2"
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default AppointmentForm
