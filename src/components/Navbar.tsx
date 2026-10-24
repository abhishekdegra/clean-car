import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Before & After', href: '#gallery' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href === '#calculator' && onOpenCalculator) {
      e.preventDefault();
      onOpenCalculator();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B0F19]/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-2.5'
              : 'bg-[#0B0F19]/80 backdrop-blur-md py-3.5 border-b border-white/5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* Brand Logo & Wordmark */}
              <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group text-left min-w-0 mr-4 xl:mr-8 shrink-0">
                {/* Luxury Circular Medallion Emblem */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7D47] via-[#F3E7D3] to-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_22px_rgba(0,229,255,0.45)] transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-[#070B12] overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/logo.png"
                        alt="Clean Car Detailing Official Crest"
                        className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>
                </div>

                {/* Typography Brand Title */}
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-royal text-base sm:text-2xl font-black tracking-wider text-white leading-tight group-hover:text-[#00E5FF] transition-colors">
                      CLEAN CAR
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#00E5FF] font-sans uppercase px-1.5 py-0.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/25 leading-none">
                      STUDIO
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-0.5 text-[#C4A574] font-bold">
                      <Star className="w-2.5 h-2.5 fill-[#C4A574] text-[#C4A574]" />
                      <span>5.0</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <MapPin className="w-2.5 h-2.5 text-[#00E5FF] shrink-0" />
                    <span className="truncate text-slate-300">Mansarovar, Jaipur</span>
                  </div>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs uppercase tracking-wider font-bold font-royal text-slate-300 hover:text-[#00E5FF] transition-colors relative py-1 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00E5FF] hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Desktop Quick Actions */}
              <div className="hidden sm:flex items-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 shadow-xs group"
                  title="Call Clean Car Detailing Jaipur"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00E5FF] group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">{BUSINESS_INFO.phoneDisplay}</span>
                </a>

                <button
                  onClick={() => onOpenBooking()}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-royal text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] rounded-full shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </button>
              </div>

              {/* Mobile Actions: Phone Call + Menu Button (Clean, no clutter, zero wrap) */}
              <div className="flex items-center gap-2 sm:hidden shrink-0">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center w-9 h-9 text-white bg-white/5 hover:bg-white/10 active:bg-[#0066FF]/20 rounded-xl transition-colors border border-white/10"
                  aria-label="Call studio"
                >
                  <Phone className="w-4 h-4 text-[#00E5FF]" />
                </a>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center justify-center w-9 h-9 text-white hover:bg-white/10 active:bg-white/15 rounded-xl transition-colors focus:outline-none border border-white/10"
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Dark Luxury Theme) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-[#0B0F19] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-white/10 animate-in slide-in-from-right duration-250">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7D47] via-[#F3E7D3] to-[#00E5FF] shadow-md shrink-0">
                    <div className="w-full h-full rounded-full bg-[#070B12] overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/logo.png"
                        alt="Clean Car Detailing Official Logo"
                        className="w-full h-full object-cover scale-110"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="font-royal font-bold text-base text-white block leading-tight">
                      CLEAN CAR
                    </span>
                    <span className="text-[10px] text-[#00E5FF] font-royal font-semibold tracking-wider uppercase block mt-0.5">
                      Mansarovar, Jaipur • 5.0 ★
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="px-4 py-3 text-sm font-bold font-royal tracking-wide text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#00E5FF]">›</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00E5FF]" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold uppercase tracking-wider font-royal text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl shadow-[0_0_20px_rgba(0,102,255,0.4)] border border-white/20 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <div className="text-center text-[11px] text-slate-400 pt-1">
                Google 5.0 ★ · 69 Verified Reviews · Jaipur
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
