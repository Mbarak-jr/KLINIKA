import { motion } from 'framer-motion';
import type { Service } from '@/data/services';

interface ServiceFeatureProps {
  service: Service;
  index: number;
}

const ServiceFeature = ({ service, index }: ServiceFeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="relative p-8">
        <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-6 bg-gradient-to-r ${service.color} text-white`}>
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
        
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
  );
};

export default ServiceFeature;