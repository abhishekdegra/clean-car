import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Services } from './components/Services';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PricingTeaserBanner } from './components/PricingTeaserBanner';
import { CalculatorPage } from './components/CalculatorPage';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { Reviews } from './components/Reviews';
import { FaqSection } from './components/FaqSection';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileQuickBar } from './components/MobileQuickBar';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'calculator'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Sync view with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#calculator') {
        setCurrentView('calculator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenCalculator = () => {
    window.location.hash = '#calculator';
    setCurrentView('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', window.location.pathname);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  // If on Dedicated Calculator View:
  if (currentView === 'calculator') {
    return (
      <div className="min-h-screen bg-[#070B12] text-[#F1F5F9] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
        <CalculatorPage
          onBackToHome={handleBackToHome}
          onOpenBooking={handleOpenBooking}
        />

        {/* Booking Enquiry Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          preselectedServiceId={selectedServiceId}
        />
      </div>
    );
  }

  // Standard Homepage View
  return (
    <div className="min-h-screen bg-[#070B12] text-[#F1F5F9] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* Sticky Luxury Navbar */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        onOpenCalculator={handleOpenCalculator} 
      />

      {/* Main Content with bottom padding on mobile for MobileQuickBar */}
      <main className="flex-1 pb-16 sm:pb-0">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Verified Trust Strip */}
        <TrustStrip />

        {/* Verified Detailing Services Showcase */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* Interactive Before & After Slider & Gallery */}
        <BeforeAfterSlider onOpenBooking={() => handleOpenBooking()} />

        {/* High-Converting Detailing Budget Calculator Teaser Banner */}
        <PricingTeaserBanner onOpenCalculator={handleOpenCalculator} />

        {/* Why Choose Us: Detailing Standards */}
        <WhyChooseUs />

        {/* 4-Step Booking Journey */}
        <HowItWorks onOpenBooking={() => handleOpenBooking()} />

        {/* Verified Google Reviews */}
        <Reviews />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Location & Studio Contacts with Map */}
        <LocationContact onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Grand CTA & Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Quick WhatsApp Dispatch Button (Desktop/Tablet) */}
      <div className="hidden sm:block">
        <FloatingWhatsApp />
      </div>

      {/* Mobile Floating Quick Action Dock */}
      <MobileQuickBar onOpenBooking={() => handleOpenBooking()} />

      {/* Booking Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={selectedServiceId}
      />
    </div>
  );
}

export default App;
