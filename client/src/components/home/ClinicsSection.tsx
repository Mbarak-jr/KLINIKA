import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import clinicService from '@/services/clinicService';
import type { Clinic as BaseClinic } from '@/types';

type ExtendedClinic = BaseClinic & {
  image?: string;
  distance?: string;
  rating?: string;
};

const ClinicsSection = () => {
  const [clinics, setClinics] = useState<ExtendedClinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await clinicService.getClinics();
        const clinicsWithExtras = data.map(clinic => ({
          ...clinic,
          image: getRandomClinicImage(),
          distance: `${(Math.random() * 5).toFixed(1)} miles away`,
          rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 - 5.0
        }));
        setClinics(clinicsWithExtras);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch clinics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const getRandomClinicImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Nearby Clinics</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover quality healthcare facilities near your location
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Enter your location or zip code"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex-1">
                  Search Clinics
                </button>
                <button className="border border-gray-700 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg flex-1">
                  Use My Location
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading clinics...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : clinics.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            modules={[Autoplay, Pagination]}
            className="pb-12"
          >
            {clinics.map(clinic => (
              <SwiperSlide key={clinic._id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all h-full"
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(Number(clinic.rating)) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-white text-sm">{clinic.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{clinic.name}</h3>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {clinic.distance}
                    </p>
                    <p className="text-gray-700 mb-4">{clinic.address}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {clinic.services?.slice(0, 3).map((service, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {service}
                        </span>
                      ))}
                      {clinic.services?.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          +{clinic.services.length - 3} more
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/clinics/${clinic._id}`)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
                    >
                      View Clinic Details
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500 text-lg py-12">
            No clinics available at the moment. Please check back later.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/clinics')}
            className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            View All Clinics
            <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicsSection;
