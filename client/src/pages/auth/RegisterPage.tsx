import AuthWrapper from '@/components/auth/AuthWrapper'
import RegisterForm from '@/components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthWrapper requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <RegisterForm />
        </div>
      </div>
    </AuthWrapper>
  )
}

export default RegisterPage