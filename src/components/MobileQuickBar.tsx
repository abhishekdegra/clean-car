import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Clean Car Detailing! I want to book a car detailing slot at your Mansarovar, Jaipur studio.'
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
      <div className="bg-[#0B0F19]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2">
        {/* Quick Phone Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors border border-white/10 shrink-0 cursor-pointer"
          aria-label="Call studio"
        >
          <Phone className="w-4 h-4 text-[#00E5FF]" />
        </a>

        {/* WhatsApp Direct Chat Button */}
        <button
          onClick={handleWhatsApp}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
          aria-label="WhatsApp enquiry"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
        </button>

        {/* Book Detailing Main Action Button */}
        <button
          onClick={onOpenBooking}
          className="flex-1 h-11 flex items-center justify-center gap-1.5 px-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,102,255,0.45)] border border-white/20 active:scale-98 transition-all cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-200" />
          <span className="truncate">Book Detailing</span>
        </button>
      </div>
    </div>
  );
};
