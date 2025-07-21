import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/hooks/useAuth'
import { useParams, Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

const ResetPasswordForm = () => {
  const { resetToken } = useParams<{ resetToken: string }>()
  const { resetPassword, error } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      if (!resetToken) return

      setIsLoading(true)
      try {
        await resetPassword(resetToken, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        setSuccess(true)
      } finally {
        setIsLoading(false)
      }
    },
  })

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Reset Successful</h2>
        <p className="text-gray-600 mb-6">
          Your password has been updated successfully. You can now login with your new password.
        </p>
        <Link to="/login">
          <Button variant="primary" className="w-full">
            Continue to Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="New Password"
          id="password"
          name="password"
          type="password"
          placeholder="Enter new password (min 8 characters)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password ? formik.errors.password : undefined}
          autoComplete="new-password"
        />

        <Input
          label="Confirm New Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full py-3"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm