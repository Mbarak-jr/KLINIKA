import { motion } from 'framer-motion';
import { FaCalendarAlt, FaNotesMedical, FaUserMd, FaClinicMedical, FaHeartbeat, FaProcedures } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <FaCalendarAlt className="text-4xl" />,
      title: "Easy Appointment Booking",
      description: "Schedule with specialists in minutes through our intuitive platform, available 24/7 for your convenience.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaNotesMedical className="text-4xl" />,
      title: "Digital Health Records",
      description: "Secure, cloud-based access to your complete medical history, test results, and treatment plans anytime.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <FaUserMd className="text-4xl" />,
      title: "Top Specialists",
      description: "Connect with board-certified physicians across 25+ specialties, all carefully vetted for excellence.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaClinicMedical className="text-4xl" />,
      title: "Modern Facilities",
      description: "State-of-the-art clinics equipped with the latest diagnostic and treatment technologies.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Preventive Care",
      description: "Comprehensive wellness programs designed to keep you healthy and detect issues early.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <FaProcedures className="text-4xl" />,
      title: "Advanced Procedures",
      description: "Minimally invasive treatments and cutting-edge surgical options for better outcomes.",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Exceptional Care, <span className="text-blue-600">Exceptional Results</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the Klinika difference with our patient-centered approach and comprehensive healthcare services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-6 bg-gradient-to-r ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="mt-6 inline-flex items-center text-blue-600 font-medium cursor-pointer"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

       <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 text-center shadow-xl border border-gray-100"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience <span className="text-blue-600">Exceptional Care</span>?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of satisfied patients who trust Klinika for their medical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-md">
              Book Your First Appointment
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300">
              Contact Our Team
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;