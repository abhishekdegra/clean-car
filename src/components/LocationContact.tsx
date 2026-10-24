import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Sparkles } from 'lucide-react';

interface LocationContactProps {
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenBooking }) => {
  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Clean Car Detailing! I would like to enquire about visiting your studio near NIFD Global on 200 Feet Bypass Road, Mansarovar, Jaipur.'
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0B0F19] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-royal uppercase tracking-wider">Visit Our Studio</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Mansarovar Studio & <span className="font-editorial italic font-normal text-[#00E5FF]">Direct Contact</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Conveniently located on 200 Feet Bypass Road in Mansarovar, Jaipur. Drop by for a complimentary paint inspection under studio lighting or book directly over WhatsApp.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Card with Logo */}
          <div className="lg:col-span-5 bg-[#0D131F] p-7 sm:p-9 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between text-left space-y-6">
            <div className="space-y-6">
              
              {/* Studio Crest & Title */}
              <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7D47] via-[#F3E7D3] to-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#070B12] overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/logo.png"
                      alt="Clean Car Detailing Official Crest"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-royal font-black text-xl sm:text-2xl text-white leading-tight">
                    CLEAN CAR <span className="text-[#00E5FF]">DETAILING</span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide mt-0.5">
                    Mansarovar, Jaipur • 5.0 ★ Top-Rated
                  </p>
                </div>
              </div>

              {/* Studio Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                  <MapPin className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-royal">Studio Address</h4>
                  <p className="text-sm sm:text-base font-semibold text-white mt-1 leading-snug">
                    {BUSINESS_INFO.address}
                  </p>
                  <span className="text-xs text-slate-400 font-medium block mt-1">
                    Landmark: Near NIFD Global / Kamla Poddar Group
                  </span>
                </div>
              </div>

              {/* Phone & Direct Call */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                  <Phone className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-royal">Direct Phone & WhatsApp</h4>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-[#00E5FF] transition-colors block mt-1 tracking-wide"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <span className="text-xs text-slate-400">Connect directly with our master detailer</span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                  <Clock className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-royal">Operating Hours</h4>
                  <p className="text-sm sm:text-base font-semibold text-white mt-1">
                    {BUSINESS_INFO.openingHours}
                  </p>
                  <span className="text-xs text-emerald-400 font-bold">Open all 7 days for inspections</span>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Chat on WhatsApp (+91 89630 34363)</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-white hover:bg-white/10 font-bold text-xs border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Call Studio</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20 shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>

          </div>

          {/* Embedded Map & Studio Location Showcase */}
          <div className="lg:col-span-7 bg-[#0D131F] p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-white/10">
              <iframe
                title="Clean Car Detailing Studio Location in Mansarovar Jaipur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.63009587422!2d75.7482!3d26.8524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ef90f94677%3A0xb3a2298e826b5c3b!2sMansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
              />

              {/* Floating Map Overlay Pill */}
              <div className="absolute top-3 left-3 bg-[#070B12]/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-cyan-500/30 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="font-royal">200 Feet Bypass Studio, Jaipur</span>
              </div>
            </div>

            {/* Note below map */}
            <div className="p-3 text-xs text-slate-400 flex items-center justify-between">
              <span>Notice: Dedicated dust-free indoor bay parking for client paint inspection.</span>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] font-bold font-royal flex items-center gap-1 hover:underline ml-2 shrink-0"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
