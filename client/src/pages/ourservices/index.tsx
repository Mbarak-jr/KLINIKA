import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import ServiceHero from '@/components/ourservices/ServiceHero';
import ServiceFeature from '@/components/ourservices/ServiceFeature';
import ServiceCTA from '@/components/ourservices/ServiceCTA';

import { services } from '@/data/services';

const OurServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 bg-gradient-to-b from-white to-gray-50 w-full">
        <div className="container mx-auto px-6">
          <ServiceHero />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceFeature
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>

          <ServiceCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurServicesPage;
