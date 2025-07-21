import { motion } from 'framer-motion';

const ServiceCTA = () => {
  return (
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
  );
};

export default ServiceCTA;