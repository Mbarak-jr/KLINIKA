// src/App.tsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from '@/routes/AppRouter'
import { AuthProvider } from './providers/AuthProvider'
import { AppointmentProvider } from './providers/AppointmentProvider'
import { ClinicProvider } from './providers/ClinicProvider' // ✅ Import it

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppointmentProvider>
          <ClinicProvider>
            <AppRouter />
          </ClinicProvider>
        </AppointmentProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
