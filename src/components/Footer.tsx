import React from 'react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { Phone, MessageCircle, MapPin, Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hello Clean Car Detailing! I would like to enquire about booking a detailing package for my car in Jaipur.'
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#05080E] text-white pt-20 pb-12 relative overflow-hidden border-t border-white/10">
      {/* Background soft ambient accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#0066FF]/15 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pre-Footer Grand CTA Section */}
        <div className="bg-[#0D131F] border border-white/10 rounded-3xl p-8 sm:p-12 mb-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] font-royal uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Showroom Transformation Awaits</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to Bring Back Your Car's <span className="font-editorial italic font-normal text-[#00E5FF]">Mirror Shine?</span>
          </h2>

          <p className="font-editorial italic text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Tell us about your vehicle. We’ll help you select the ideal detailing treatment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold text-xs uppercase tracking-wider font-royal hover:from-[#0052CC] hover:to-[#0066FF] shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
            >
              <span>Book Studio Inspection</span>
              <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider font-royal shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp Us Directly</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Google 5.0 Star Rated Detailing Studio in Mansarovar, Jaipur</span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10 text-left">
          
          {/* Brand Info with User's Official Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7D47] via-[#F3E7D3] to-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#070B12] overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/logo.png"
                    alt="Clean Car Detailing Official Logo"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </div>
              <div>
                <span className="font-royal text-2xl font-bold tracking-wider text-white block">
                  CLEAN CAR
                </span>
                <span className="text-xs font-semibold text-[#00E5FF] tracking-widest font-royal uppercase block mt-0.5">
                  Detailing Studio • Jaipur
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Jaipur's premier boutique automotive detailing studio. Engineered to protect your pride and joy against Rajasthan's extreme heat, desert dust storms, and hard borewell water.
            </p>

            <div className="pt-2 text-xs text-[#C4A574] font-bold font-royal flex items-center gap-1.5">
              <span>★ 5.0 RATING · 69 VERIFIED GOOGLE REVIEWS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] font-royal">
              Detailing Treatments
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Location & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] font-royal">
              Mansarovar Studio
            </div>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-1" />
                <span>{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white hover:text-[#00E5FF] transition-colors font-bold tracking-wide">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>{BUSINESS_INFO.openingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {CURRENT_YEAR} Clean Car Detailing — Mansarovar, Jaipur, Rajasthan. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right font-royal">
            <span>Precision Detailing Standards • Serving All Jaipur</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
