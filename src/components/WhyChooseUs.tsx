import React from 'react';
import { motion } from 'motion/react';
import { Eye, Shield, Droplets, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'High-CRI Studio Lighting',
      description: 'We inspect paint under specialized 4,000K daylight-spectrum lamps, revealing hidden micro-scratches that ordinary garages miss.'
    },
    {
      icon: Droplets,
      title: 'Twin-Bucket Wash Protocol',
      description: 'Rough cloths cause 90% of swirl marks. We use grit-guard twin buckets and pH-neutral foam to lift desert dust safely without scouring.'
    },
    {
      icon: Shield,
      title: 'Digital Clear Coat Metrology',
      description: 'Ultrasonic gauges map clear coat thickness across all panels before polishing, ensuring safe swirl removal without thinning clear coat.'
    },
    {
      icon: Sparkles,
      title: 'Climate Engineered Chemistry',
      description: 'Our 9H ceramic and graphene coatings are selected to endure 45°C summer heat, alkaline borewell water, and desert dust abrasion.'
    }
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#070B12] relative border-t border-white/5">
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
            <span className="font-royal uppercase tracking-wider">The Detailing Standard</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Craftsmanship Over <span className="font-editorial italic font-normal text-[#00E5FF]">Volume</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Unlike quick washes that rush cars through rough cloths, Clean Car Detailing dedicates full days to single vehicles under surgical studio lighting.
          </p>
        </motion.div>

        {/* Pillars Grid with Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-[#0D131F] p-7 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:border-[#00E5FF]/40 transition-all text-left flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E5FF] mb-4 group-hover:scale-108 transition-transform">
                    <Icon className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00E5FF] uppercase tracking-wider font-royal mb-1.5">
                    <span>Studio Standard 0{idx + 1}</span>
                  </div>

                  <h3 className="font-royal text-xl sm:text-2xl text-white font-bold tracking-tight mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                  <span>Guaranteed on every detailing appointment</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
