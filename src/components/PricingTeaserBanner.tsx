import React from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface PricingTeaserBannerProps {
  onOpenCalculator: () => void;
}

export const PricingTeaserBanner: React.FC<PricingTeaserBannerProps> = ({ onOpenCalculator }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Clean Car Detailing! I want to enquire about the price and packages for car detailing in Mansarovar, Jaipur.'
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing-teaser" className="relative py-16 sm:py-24 overflow-hidden bg-[#070B12] scroll-mt-20">
      
      {/* Background Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[450px] bg-gradient-to-r from-[#0066FF]/20 via-[#00E5FF]/15 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grand Teaser Card */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 bg-gradient-to-b from-[#0D1627] via-[#0A0F1D] to-[#070B14] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 space-y-6 text-left relative z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00E5FF]/30 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">
                  JAIPUR STUDIO BUDGET ESTIMATOR
                </span>
              </div>

              {/* High-Impact Headline */}
              <div className="space-y-3">
                <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.15]">
                  TRANSPARENT STUDIO ESTIMATES.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0066FF] to-[#38BDF8] drop-shadow-[0_0_30px_rgba(0,102,255,0.6)]">
                    CALCULATE YOUR DETAILING INVESTMENT.
                  </span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
                  From multi-stage paint correction and 10H ceramic shield to self-healing TPU armor — calculate an accurate, transparent studio quotation in <strong className="text-white">under 30 seconds</strong>. Zero hidden bay charges, backed by official studio warranties.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 py-1 font-sans text-xs text-slate-300 max-w-lg">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                  <span>100% Transparent Rates</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                  <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Instant 30-Sec Estimate</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5 to 10 Yr Warranties</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Direct WhatsApp Quote</span>
                </div>
              </div>

              {/* Sample Price Indications */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-sans">
                <span className="text-slate-400">Indicative Packages:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0066FF]/15 text-[#38BDF8] border border-[#0066FF]/30 font-semibold">
                  Hatchback: From ₹13,999
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0066FF]/15 text-[#00E5FF] border border-[#0066FF]/30 font-semibold">
                  SUV (Thar/Creta): From ₹17,999
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0066FF]/15 text-slate-200 border border-[#0066FF]/30 font-semibold">
                  Fortuner: From ₹27,999
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={onOpenCalculator}
                  className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,102,255,0.5)] hover:shadow-[0_0_35px_rgba(0,102,255,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Calculator className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span>Open Detailing Budget Calculator</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3.5 px-5 rounded-2xl bg-[#0B0F19] hover:bg-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-emerald-500/50 shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct Enquiry</span>
                </button>
              </div>

            </div>

            {/* Right Visual Image Showcase (5 Cols) */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[300px] lg:min-h-[460px] overflow-hidden">
              <img
                src="/assets/calculator-banner.jpg"
                alt="Luxury Automotive Detailing Cost Estimator Display at Clean Car Detailing Studio Jaipur"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Inner Dark Gradient Overlays for Seamless Blending */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-[#0A0F1D]/40 to-[#0A0F1D] pointer-events-none" 
              />
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 via-transparent to-[#00E5FF]/10 pointer-events-none" 
              />

              {/* Floating Live Badge Over Image */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0B0F19]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="font-sans font-bold text-xs text-white">
                  Live Studio Estimator Available
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
