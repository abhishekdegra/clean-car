import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { REVIEWS, BUSINESS_INFO } from '../data/content';
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  Sparkles, 
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track horizontal scroll position on mobile to highlight active dot
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveIndex(Math.min(Math.max(newIndex, 0), REVIEWS.length - 1));
    }
  };

  const scrollToReview = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    scrollToReview(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToReview(Math.min(REVIEWS.length - 1, activeIndex + 1));
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#070B12] relative border-t border-white/5 overflow-hidden">
      
      {/* Background Studio Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066FF]/10 via-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00E5FF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-royal uppercase tracking-wider">Verified Jaipur Testimonials</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Rated 5.0 Stars Across <span className="font-editorial italic font-normal text-[#00E5FF]">Jaipur</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Rated 5.0 across {BUSINESS_INFO.googleReviewCount}+ verified client reviews in Jaipur. Here is what local car owners experience after our treatments.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#0D131F] border border-white/10 shadow-lg">
            <div className="flex text-[#C4A574]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C4A574]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-white font-royal tracking-wide">
              5.0 Out of 5.0 Rating
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400">
              ({BUSINESS_INFO.googleReviewCount} Google Reviews)
            </span>
          </div>
        </motion.div>

        {/* Mobile Swipe Hint & Navigation Arrows Header (Visible on Mobile) */}
        <div className="md:hidden flex items-center justify-between mb-4 px-1 text-xs text-slate-400 font-sans">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#00E5FF]">← Swipe</span>
            <span>Jaipur Client Reviews ({activeIndex + 1}/{REVIEWS.length})</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'border-white/10 text-slate-600 opacity-40 cursor-not-allowed'
                  : 'border-white/20 text-white bg-white/5 active:bg-white/15'
              }`}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === REVIEWS.length - 1}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === REVIEWS.length - 1
                  ? 'border-white/10 text-slate-600 opacity-40 cursor-not-allowed'
                  : 'border-white/20 text-white bg-white/5 active:bg-white/15'
              }`}
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Container: Horizontal Scroll Snap on Mobile, 2-Col Grid on Desktop */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="w-[85vw] max-w-[340px] sm:max-w-none md:w-auto shrink-0 snap-center bg-[#0D131F] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:border-[#00E5FF]/40 transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1 select-none"
            >
              <div className="space-y-3.5">
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#C4A574] mb-1.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C4A574]" />
                      ))}
                    </div>
                    <div className="text-xs font-bold text-[#00E5FF] font-sans">
                      Vehicle: <span className="text-white">{review.vehicle}</span>
                    </div>
                  </div>

                  <MessageSquareQuote className="w-7 h-7 sm:w-8 sm:h-8 text-white/15 group-hover:text-[#00E5FF] transition-colors shrink-0" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white font-sans">{review.author}</h3>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">{review.date}</div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span>Verified Client</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="md:hidden flex items-center justify-center gap-1.5 pt-3">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToReview(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-6 bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.6)]'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Google Maps link */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-slate-200 text-xs font-bold font-royal uppercase tracking-wider border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-xs"
          >
            <span>View Clean Car Detailing on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF]" />
          </a>
        </div>

      </div>
    </section>
  );
};
