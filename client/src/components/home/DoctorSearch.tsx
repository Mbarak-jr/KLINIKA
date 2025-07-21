import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserMd, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';
import doctorService from '@/services/doctorService';
import type { Doctor } from '@/types';

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const specialties = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'Gynecology',
    'General Practice'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchName = doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecialty = specialty ? doctor.specialization === specialty : true;
    const matchLocation = location
      ? typeof doctor.clinic !== 'string' && doctor.clinic?.address.toLowerCase().includes(location.toLowerCase())
      : true;
    return matchName && matchSpecialty && matchLocation;
  });

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gray-800 px-8 py-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
              <FaUserMd className="mr-3 text-blue-400" />
              Find Your Perfect Doctor
            </h2>
          </div>

          {/* Search Form */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Search */}
              <div>
                <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaSearch className="mr-2 text-blue-600" />
                  Search by Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="e.g. Dr. Sarah Johnson"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Specialty Select */}
              <div>
                <label htmlFor="specialty" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaFilter className="mr-2 text-blue-600" />
                  Specialty
                </label>
                <div className="relative">
                  <select
                    id="specialty"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <FaUserMd className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Location Search */}
              <div className="md:col-span-2">
                <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" />
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter city, zip code, or address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Display Results */}
            {loading ? (
              <div className="text-center text-gray-500">Loading doctors...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center text-gray-500">No doctors found.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <li key={doctor._id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.user.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        {typeof doctor.clinic !== 'string' && doctor.clinic && (
                          <p className="text-sm text-gray-500">{doctor.clinic.address}</p>
                        )}
                      </div>
                      <div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">View Profile</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorSearch;
