import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

// Define link types
type SimpleLink = { name: string; path: string };
type SubmenuLink = { name: string; submenu: SimpleLink[] };
type SidebarLink = SimpleLink | SubmenuLink;

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const toggleButton = document.getElementById('mobile-menu-button');

      if (
        isMobile &&
        sidebar &&
        toggleButton &&
        !sidebar.contains(event.target as Node) &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  if (!user) return null;

  const patientLinks: SidebarLink[] = [
    { name: 'Dashboard', path: '/patient-dashboard' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'My Appointments', path: '/my-appointments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Clinics', path: '/clinics' },
  ];

  const doctorLinks: SidebarLink[] = [
    { name: 'Dashboard', path: '/doctor-dashboard' },
    { name: 'Appointments', path: '/doctor-dashboard/appointments' },
    { name: 'Profile', path: `/doctors/${user._id}` },
    {
      name: 'Schedule',
      submenu: [
        { name: 'View Schedule', path: '/doctor-schedule' },
        { name: 'Set Availability', path: '/set-availability' },
      ],
    },
  ];

  const adminLinks: SidebarLink[] = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Manage Clinics', path: '/manage-clinics' },
    { name: 'Manage Doctors', path: '/doctors' },
    { name: 'Reports', path: '/admin-reports' },
  ];

  const links: SidebarLink[] =
    user.role === 'admin' ? adminLinks : user.role === 'doctor' ? doctorLinks : patientLinks;

  const isActive = (path: string) => location.pathname === path;

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const isSubmenuLink = (link: SidebarLink): link is SubmenuLink => {
    return 'submenu' in link;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-[4.5rem] left-4 z-50 bg-gray-700 p-3 rounded-full text-white shadow-lg"
      >
        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`w-64 bg-gray-800 text-white p-5 fixed z-40 transition-all duration-300 ${
          isMobile 
            ? (isMobileMenuOpen ? 'left-0 top-16' : '-left-64 top-16') 
            : 'left-0 top-16'
        } h-[calc(100vh-4rem)] overflow-y-auto shadow-xl`}
      >
        <nav>
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={`${link.name}-${index}`}>
                {isSubmenuLink(link) ? (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition duration-200 ${
                        link.submenu.some((sublink) => isActive(sublink.path))
                          ? 'bg-gray-700 font-semibold'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-white">{link.name}</span>
                      {activeSubmenu === link.name ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </button>
                    {activeSubmenu === link.name && (
                      <ul className="ml-2 mt-1 space-y-1 border-l-2 border-gray-600 pl-3 py-2">
                        {link.submenu.map((sublink) => (
                          <li key={sublink.path}>
                            <Link
                              to={sublink.path}
                              className={`block px-4 py-2 rounded-lg transition duration-200 ${
                                isActive(sublink.path)
                                  ? 'bg-gray-700 font-medium text-white'
                                  : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                              }`}
                              onClick={() => isMobile && setIsMobileMenuOpen(false)}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg transition duration-200 mb-1 ${
                      isActive(link.path)
                        ? 'bg-gray-700 font-semibold text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                    }`}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;