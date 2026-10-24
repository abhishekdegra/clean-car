import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Clean Car Detailing! I would like to enquire about car detailing services at your Jaipur studio.'
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Quick Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0D131F] text-white px-3.5 py-2 rounded-2xl shadow-2xl border border-white/15 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chat with Studio Manager</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleOpenWhatsApp}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-108 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Contact Clean Car Detailing on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 fill-white text-white relative z-10" />
      </button>
    </div>
  );
};
