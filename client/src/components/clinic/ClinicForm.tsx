import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import type { Clinic } from '@/types' // type-only import

interface ClinicFormProps {
  initialValues?: Partial<Clinic>
  onSubmit: (values: Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
}

const ClinicForm = ({ initialValues, onSubmit, onCancel }: ClinicFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      address: initialValues?.address || '',
      phone: initialValues?.phone || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await onSubmit(values as Omit<Clinic, '_id' | 'createdAt' | 'updatedAt'>)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Name"
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name ? formik.errors.name : undefined}
      />

      <Input
        label="Address"
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
        error={formik.touched.address ? formik.errors.address : undefined}
      />

      <Input
        label="Phone"
        id="phone"
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.touched.phone ? formik.errors.phone : undefined}
      />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default ClinicForm
