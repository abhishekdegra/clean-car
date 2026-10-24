import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, Sliders, Shield } from 'lucide-react';

interface BeforeAfterSliderProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percentage = (clamped / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#0B0F19] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-royal uppercase tracking-wider">Live Paint Transformation</span>
          </div>
          
          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            See The Difference <span className="font-editorial italic font-normal text-[#00E5FF]">True Craftsmanship</span> Makes
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Drag the slider to inspect the exact clear coat recovery under high-intensity 4,000K inspection lighting. Swirl marks caused by daily society cleaners are safely leveled to reveal a deep obsidian mirror reflection.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto bg-[#0D131F] p-3 sm:p-5 rounded-3xl border border-white/10 shadow-2xl">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-pan-y focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and after detailing comparison slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* "After" Image (Background Full View) */}
            <img
              src="/assets/paint-after.jpg"
              alt="After: Deep 10H Ceramic Gloss finish with 99% swirl recovery"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
              loading="lazy"
            />

            {/* "Before" Image (Clipped Left Side) */}
            <div
              className="absolute inset-0 overflow-hidden select-none pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/assets/paint-before.jpg"
                alt="Before: Paint with heavy swirl marks and dull clear coat"
                className="absolute inset-0 w-full h-full object-cover max-w-none select-none pointer-events-none"
                style={{
                  width: containerWidth ? `${containerWidth}px` : '100%',
                }}
                draggable={false}
                loading="lazy"
              />
            </div>

            {/* Visual Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00E5FF] via-white to-[#0066FF] shadow-[0_0_15px_rgba(0,229,255,0.8)] pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Draggable Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#070B12] border-2 border-[#00E5FF] slider-handle-shadow flex items-center justify-center text-white cursor-ew-resize transition-transform hover:scale-110 active:scale-95"
                aria-hidden="true"
              >
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5FF]" />
              </div>
            </div>

            {/* Floating Pills for Context */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md text-red-400 text-xs font-bold font-royal px-3 py-1.5 rounded-full border border-red-500/30 shadow-md">
                BEFORE: Swirls & Micro-Scratches
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md text-emerald-400 text-xs font-bold font-royal px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                AFTER: 10H Ceramic Mirror Reflection
              </span>
            </div>
          </div>

          {/* Slider Controls Helper Note */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00E5FF]" />
              <span>Drag handle left or right to inspect the microscopic paint recovery</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Authentic Jaipur Studio Bay Inspection Photo</span>
            </div>
          </div>

          {/* Key Facts Below Slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-3 border-t border-white/10 text-left">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white font-royal">100% Optical Correction</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Removes 90-95% of wash swirls without damaging factory clear coat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white font-royal">Clear Coat Safety</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Digital ultrasonic depth gauges prevent unnecessary clear coat thinning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white font-royal">Hydrophobic Lock</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sealed with 9H ceramic coating to ensure years of easy washing in Jaipur dust.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Showcase Grid featuring Indian Fortuner & Detailing Craft */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="group rounded-2xl overflow-hidden bg-[#0D131F] border border-white/10 shadow-lg hover:border-[#00E5FF]/40 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="/assets/fortuner-ceramic.jpg"
                alt="Toyota Fortuner ceramic coating at Clean Car Detailing Jaipur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-[#070B12]/90 backdrop-blur-md text-[#00E5FF] text-[11px] font-bold font-royal px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                Fortuner Legender
              </span>
            </div>
            <div className="p-4 text-left">
              <h4 className="text-sm font-bold text-white font-royal group-hover:text-[#00E5FF] transition-colors">10H Ceramic Coating</h4>
              <p className="text-xs text-slate-400 mt-1">
                Deep pearl white gloss with zero yellowish water spots from Jaipur borewells.
              </p>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden bg-[#0D131F] border border-white/10 shadow-lg hover:border-[#00E5FF]/40 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="/assets/graphene-coating.jpg"
                alt="Hydrophobic water beading on graphene coated car"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-[#070B12]/90 backdrop-blur-md text-[#00E5FF] text-[11px] font-bold font-royal px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                110° Water Beading
              </span>
            </div>
            <div className="p-4 text-left">
              <h4 className="text-sm font-bold text-white font-royal group-hover:text-[#00E5FF] transition-colors">Graphene Nanotech Shield</h4>
              <p className="text-xs text-slate-400 mt-1">
                Extreme surface tension sheets water instantly, preventing mineral bake-in.
              </p>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden bg-[#0D131F] border border-white/10 shadow-lg hover:border-[#00E5FF]/40 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="/assets/interior-detailing.jpg"
                alt="Pristine interior leather deep cleaning and conditioning"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-[#070B12]/90 backdrop-blur-md text-[#00E5FF] text-[11px] font-bold font-royal px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                OEM Matte Leather
              </span>
            </div>
            <div className="p-4 text-left">
              <h4 className="text-sm font-bold text-white font-royal group-hover:text-[#00E5FF] transition-colors">Steam Cabin Sanitization</h4>
              <p className="text-xs text-slate-400 mt-1">
                Gentle steam extraction removes trapped desert dust without oily shine.
              </p>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden bg-[#0D131F] border border-white/10 shadow-lg hover:border-[#00E5FF]/40 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="/assets/ppf-installation.jpg"
                alt="Paint Protection Film installation on luxury car bumper"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-[#070B12]/90 backdrop-blur-md text-[#00E5FF] text-[11px] font-bold font-royal px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                Self-Healing TPU
              </span>
            </div>
            <div className="p-4 text-left">
              <h4 className="text-sm font-bold text-white font-royal group-hover:text-[#00E5FF] transition-colors">Highway Stone Chip PPF</h4>
              <p className="text-xs text-slate-400 mt-1">
                Optically transparent physical armor against Jaipur-Delhi highway gravel.
              </p>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white text-xs font-bold font-royal uppercase tracking-wider shadow-[0_0_20px_rgba(0,102,255,0.4)] border border-white/20 transition-all"
          >
            <Shield className="w-4 h-4 text-[#00E5FF]" />
            <span>Book Your Studio Paint Inspection</span>
          </button>
        </div>

      </div>
    </section>
  );
};
