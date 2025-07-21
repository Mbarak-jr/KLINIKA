import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const { register, error } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
      role: Yup.string().oneOf(['patient', 'doctor', 'admin']).required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role as 'patient' | 'doctor' | 'admin',
        })
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name ? formik.errors.name : undefined}
            autoComplete="off"
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email ? formik.errors.email : undefined}
            autoComplete="off"
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Create a password (min 8 characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password ? formik.errors.password : undefined}
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
            autoComplete="new-password"
          />

          <div className="space-y-1">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              className={`block w-full px-4 py-2 rounded-md border ${
                formik.touched.role && formik.errors.role 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500'
              } shadow-sm focus:outline-none focus:ring-2`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.role}
              </p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading} 
          className="w-full py-3"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm