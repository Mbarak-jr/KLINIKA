import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { Link } from 'react-router-dom'

const ForgotPasswordForm = () => {
  const { forgotPassword, error } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values: { email: string }) => {
      setIsLoading(true)
      try {
        await forgotPassword(values.email)
        setEmailSent(true)
      } finally {
        setIsLoading(false)
      }
    },
  })

  if (emailSent) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Sent</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to your email address.
        </p>
        <Link to="/login">
          <Button variant="primary" className="w-full">
            Back to Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your email to receive a reset link
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your registered email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email ? formik.errors.email : undefined}
          autoComplete="off"
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full py-3"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm