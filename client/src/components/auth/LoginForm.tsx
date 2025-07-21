import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const { login, error } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await login(values)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
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
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password ? formik.errors.password : undefined}
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full py-3"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-800 font-medium hover:underline">
            Register
          </Link>
        </div>

        {/* Back to Home Button - matches "primary" style */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500"
          >
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
