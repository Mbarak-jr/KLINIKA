import { useState, useEffect, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Add useLocation
import authService from '@/services/authService';
import { AuthContext } from '@/context/AuthContext';
import type { User, ApiError } from '@/types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setInitialAuthChecked(true);
        return;
      }

      try {
        const userData = await authService.getMe();
        setUser(userData);

        const isProtectedRoute = [
          '/admin-dashboard',
          '/doctor-dashboard',
          '/patient-dashboard',
        ].includes(location.pathname);

        if (!isProtectedRoute && location.pathname === '/') {
          navigate(
            userData.role === 'admin'
              ? '/admin-dashboard'
              : userData.role === 'doctor'
              ? '/doctor-dashboard'
              : '/patient-dashboard'
          );
        }
      } catch (err) {
        console.warn('❌ Auth check failed or token expired:', err);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialAuthChecked(true);
      }
    };

    checkAuth();
  }, [navigate, location]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError(null);
      const userData = await authService.login(credentials);

      if (!userData || !userData.role) {
        throw new Error('Login failed: Invalid response from server');
      }

      setUser(userData);

      // ✅ Redirect after login
      navigate(
        userData.role === 'admin'
          ? '/admin-dashboard'
          : userData.role === 'doctor'
          ? '/doctor-dashboard'
          : '/patient-dashboard'
      );
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
  }) => {
    try {
      setError(null);
      const registeredUser = await authService.register(userData);

      if (!registeredUser || !registeredUser.role) {
        throw new Error('Registration failed: Invalid response from server');
      }

      setUser(registeredUser);

      // ✅ Redirect after registration
      navigate(
        registeredUser.role === 'admin'
          ? '/admin-dashboard'
          : registeredUser.role === 'doctor'
          ? '/doctor-dashboard'
          : '/patient-dashboard'
      );
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await authService.forgotPassword(email);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const resetPassword = async (
    token: string,
    passwords: { password: string; confirmPassword: string }
  ) => {
    try {
      setError(null);
      await authService.resetPassword(token, passwords);
      navigate('/login');
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Password reset failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || !initialAuthChecked,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
