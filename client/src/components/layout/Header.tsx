import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3 shadow-sm'}`}>
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800">NovaHealth</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {!user && (
            <>
              <Link to="/doctors" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Doctors</Link>
              <Link to="/clinics" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Clinics</Link>
              <Link to="/services" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Services</Link>
            </>
          )}

          {user ? (
            <div className="flex items-center space-x-6">
              <span className="text-gray-700 hidden lg:inline font-medium">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">Register</Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Nav - full width */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            {!user && (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/doctors" className="px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Doctors</Link>
                <Link to="/clinics" className="px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Clinics</Link>
                <Link to="/services" className="px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium col-span-2">Services</Link>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div className="space-y-4">
                  <div className="text-center text-gray-700 font-medium">Hello, {user.name}</div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" className="px-4 py-2 text-center bg-gray-700 text-white rounded-lg hover:bg-gray-600">Login</Link>
                  <Link to="/register" className="px-4 py-2 text-center bg-gray-700 text-white rounded-lg hover:bg-gray-600">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;