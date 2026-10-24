import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, BUSINESS_INFO } from '../data/content';
import { Sparkles, MessageCircle, Calendar, Check, Clock, Car, Info, ShieldCheck } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'coating', label: 'Ceramic & PPF Armor' },
    { id: 'paint', label: 'Paint Correction' },
    { id: 'interior', label: 'Interior Dry Clean & Engine' },
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'coating') {
      return ['ceramic-coating', 'ppf', 'graphene-coating', 'teflon-coating'].includes(service.id);
    }
    if (activeCategory === 'paint') {
      return ['paint-correction', 'teflon-coating'].includes(service.id);
    }
    if (activeCategory === 'interior') {
      return ['interior-cleaning', 'engine-silencer-coating'].includes(service.id);
    }
    return true;
  });

  const handleWhatsAppQuote = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Clean Car Detailing! I would like to get a quote and check slot availability for: ${serviceTitle}. Please share pricing and duration for my car in Jaipur.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#070B12] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-royal uppercase tracking-wider">Studio Detailing Treatments</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tailored <span className="font-editorial italic font-normal text-[#00E5FF]">Ceramic, PPF & Restoration</span> Packages
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Engineered to protect against Rajasthan's intense heat, desert dust, and hard borewell water. Every vehicle receives dedicated bay time under inspection lighting.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] border border-white/20'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services List with Motion Animation */}
        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isReversed = index % 2 === 1;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#0D131F] rounded-3xl border border-white/10 shadow-2xl hover:border-[#00E5FF]/40 transition-all duration-300 overflow-hidden group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Service Image */}
                    <div className={`lg:col-span-5 relative overflow-hidden min-h-[280px] lg:min-h-full ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      <img
                        src={service.image}
                        alt={`${service.title} in Jaipur`}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Badge Overlay */}
                      {service.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-[#070B12]/90 backdrop-blur-md text-[#00E5FF] text-xs font-bold font-royal px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-md flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                            {service.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Content */}
                    <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <div className="space-y-3.5">
                        
                        {/* Meta Indicators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-200 font-bold border border-white/10">
                            <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                            <span>Duration: {service.duration}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                            <Car className="w-3.5 h-3.5 text-[#C4A574]" />
                            <span>{service.idealFor}</span>
                          </span>
                        </div>

                        {/* Title & Tagline in Classic Font */}
                        <div>
                          <h3 className="font-royal text-2xl sm:text-3xl font-bold text-white tracking-wide group-hover:text-[#00E5FF] transition-colors">
                            {service.title}
                          </h3>
                          <p className="font-editorial italic text-xs sm:text-sm text-[#00E5FF] mt-0.5 font-semibold">
                            {service.tagline}
                          </p>
                        </div>

                        {/* Description: Brief & Crisp */}
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features Checklist */}
                        <div className="pt-1">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-royal mb-2">
                            Key Treatment Features:
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-4 h-4 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-[#00E5FF]">
                                  <Check className="w-3 h-3 text-[#00E5FF]" />
                                </div>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Action Area */}
                      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Info className="w-4 h-4 text-[#00E5FF] shrink-0" />
                          <span>Pricing tailored to vehicle size (Hatchback/SUV/Sedan)</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleWhatsAppQuote(service.title)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs border border-emerald-500/30 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>WhatsApp Quote</span>
                          </button>

                          <button
                            onClick={() => onOpenBooking(service.id)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white hover:from-[#0052CC] hover:to-[#0066FF] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,102,255,0.4)] border border-white/20"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Slot</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
