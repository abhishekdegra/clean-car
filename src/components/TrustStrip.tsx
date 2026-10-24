import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Sparkles, Shield, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: Star,
      title: '5.0 Google Rating',
      subtitle: `${BUSINESS_INFO.googleReviewCount} Verified Jaipur Reviews`,
      highlight: true
    },
    {
      icon: MapPin,
      title: 'Mansarovar Studio',
      subtitle: '200 Feet Bypass Road, Jaipur',
      highlight: false
    },
    {
      icon: Sparkles,
      title: 'Hand-Crafted Care',
      subtitle: 'Zero automated harsh brushes',
      highlight: false
    },
    {
      icon: Shield,
      title: 'Climate Engineered',
      subtitle: 'Heat, dust & hard water defense',
      highlight: false
    },
    {
      icon: Clock,
      title: 'Open All 7 Days',
      subtitle: '9:30 AM – 8:00 PM by appointment',
      highlight: false
    }
  ];

  return (
    <section id="trust-strip" className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#0D131F]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-7"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className={`flex items-center gap-3.5 group cursor-default transition-transform hover:-translate-y-0.5 ${
                  index > 0 ? 'pt-4 lg:pt-0 lg:pl-5' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-108 ${
                    point.highlight
                      ? 'bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white border border-white/20 shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                      : 'bg-white/5 text-[#00E5FF] border border-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-white font-royal leading-snug group-hover:text-[#00E5FF] transition-colors">
                    {point.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 leading-tight mt-0.5">
                    {point.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
