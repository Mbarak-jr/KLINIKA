import { motion } from 'framer-motion';

const ServiceHero = () => {
  return (
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
  );
};

export default ServiceHero;