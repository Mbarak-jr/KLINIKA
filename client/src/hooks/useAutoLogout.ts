import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const useAutoLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
        navigate('/');
        toast.error('🔒 You have been logged out due to inactivity.', {
          duration: 5000,
        });
      }, INACTIVITY_TIMEOUT);
    };

    resetTimer();

    const events = ['mousemove', 'keypress', 'mousedown', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [logout, navigate]);
};
