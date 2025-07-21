import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaHeartbeat, FaUserMd } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden py-16 md:py-24">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('/medical-pattern.svg')] bg-repeat opacity-10"
      />
      
      {/* Floating medical icons */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-1/4 text-white/20"
      >
        <FaStethoscope className="text-5xl md:text-6xl" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-20 top-1/3 text-white/20"
      >
        <FaHeartbeat className="text-6xl md:text-7xl" />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl lg:max-w-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                <FaUserMd className="text-lg text-white" />
              </div>
              <span className="bg-gray-700/50 text-gray-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                Trusted Healthcare Provider
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Exceptional <span className="text-blue-300">Healthcare</span> For Your Whole Family
            </h1>
            
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Connect with top-rated specialists, manage your health records securely, 
              and receive personalized care designed around your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link 
                to="/doctors" 
                className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 md:px-6 md:py-3 rounded-lg font-semibold text-base md:text-lg transition-colors duration-300 shadow-md flex items-center justify-center"
              >
                Find a Doctor
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
             <Link 
              to="/services" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 md:px-6 md:py-3 rounded-lg font-semibold text-base md:text-lg transition-colors duration-300 shadow-md flex items-center justify-center"
            >
              Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
            </Link>

            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center">
                <div className="bg-gray-700/30 rounded-full p-1.5 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 text-sm md:text-base">24/7 Emergency Care</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-700/30 rounded-full p-1.5 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 text-sm md:text-base">200+ Specialist Doctors</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-xl lg:max-w-md xl:max-w-lg mt-8 lg:mt-0"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Doctor with patient" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-blue-900/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;