// src/pages/HomePage.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import DoctorSearch from '@/components/home/DoctorSearch';
import ClinicsSection from '@/components/home/ClinicsSection';
import CTASection from '@/components/home/CTASection';
import FAQs from '@/components/home/FAQs';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <DoctorSearch />
        <ClinicsSection />
        <FAQs />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;