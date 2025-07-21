import { Link } from 'react-router-dom'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import AuthWrapper from '@/components/auth/AuthWrapper'

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <ForgotPasswordForm />

          {/* Styled like a primary button */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-block px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default ForgotPasswordPage
