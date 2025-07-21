// src/components/home/CTASection.tsx
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white w-full">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take the First Step?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Your health journey starts here. Book an appointment with one of our specialists today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Book an Appointment
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;