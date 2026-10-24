import React from 'react';
import { motion } from 'motion/react';
import { WORK_PROCESS_STEPS } from '../data/content';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#0B0F19] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-3.5 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-royal uppercase tracking-wider">Seamless Booking Journey</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Four Steps to a <span className="font-editorial italic font-normal text-[#00E5FF]">Flawless Finish</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Direct, transparent booking for your vehicle. No waiting queues or hidden extra charges.
          </p>
        </motion.div>

        {/* Steps Grid with Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORK_PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#0D131F] p-7 rounded-3xl border border-white/10 shadow-xl hover:border-[#00E5FF]/40 transition-all text-left relative flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-royal text-3xl font-bold text-[#00E5FF] group-hover:scale-110 transition-transform block">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-royal">
                    Step {idx + 1}
                  </span>
                </div>

                <h3 className="font-royal text-lg sm:text-xl text-white mb-2 font-bold group-hover:text-[#00E5FF] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#070B12] border border-white/20 flex items-center justify-center text-[#00E5FF] shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white text-xs font-bold font-royal uppercase tracking-wider shadow-[0_0_20px_rgba(0,102,255,0.4)] border border-white/20 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Detailing Slot</span>
          </button>
        </div>

      </div>
    </section>
  );
};
