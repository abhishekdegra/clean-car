import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  Droplets, 
  Shield 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface HeroProps {
  onOpenBooking: () => void;
}

interface TapEffect {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [activeBayMode, setActiveBayMode] = useState<'bay' | 'foam' | 'ceramic' | 'ppf'>('foam');
  const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);
  const [hasTapped, setHasTapped] = useState(false);
  const mobileShowcaseRef = useRef<HTMLDivElement>(null);

  const handleShowcaseTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setHasTapped(true);
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Spawn 3-5 bubbles / mist bursts on tap
    const newId = Date.now();
    const newBursts: TapEffect[] = [
      { id: newId, x, y, size: 70 },
      { id: newId + 1, x: x - 25, y: y - 20, size: 45 },
      { id: newId + 2, x: x + 25, y: y - 15, size: 55 },
      { id: newId + 3, x: x - 10, y: y + 25, size: 40 },
    ];

    setTapEffects((prev) => [...prev.slice(-12), ...newBursts]);

    setTimeout(() => {
      setTapEffects((prev) => prev.filter((item) => !newBursts.some((b) => b.id === item.id)));
    }, 700);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Clean Car Detailing! I saw your Thar detailing showcase and would like to enquire about a snow foam wash and ceramic coating package in Jaipur.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Continuous ambient bubbles floating over the car
  const continuousBubbles = [
    { id: 1, left: '15%', size: 38, delay: '0s', duration: '5.2s', drift: '15px' },
    { id: 2, left: '32%', size: 26, delay: '1.2s', duration: '4.8s', drift: '-20px' },
    { id: 3, left: '48%', size: 44, delay: '2.5s', duration: '6.0s', drift: '25px' },
    { id: 4, left: '65%', size: 30, delay: '0.8s', duration: '5.0s', drift: '-15px' },
    { id: 5, left: '78%', size: 48, delay: '1.9s', duration: '5.6s', drift: '20px' },
    { id: 6, left: '88%', size: 24, delay: '3.1s', duration: '4.6s', drift: '-10px' },
    { id: 7, left: '25%', size: 34, delay: '2.8s', duration: '5.8s', drift: '18px' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#070B12]">
      
      {/* Background Studio Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-b from-[#0066FF]/20 via-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none -z-10"
      />
      <div 
        aria-hidden="true" 
        className="absolute -top-32 right-10 w-[350px] h-[350px] bg-[#C4A574]/15 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* ============================================================== */}
      {/* 1. DESKTOP / WEB VIEW: FULL SCREEN IMMERSIVE STUDIO CANVAS */}
      {/* All visible in ONE view above the fold, Thar full screen in bg */}
      {/* ============================================================== */}
      <div 
        onClick={handleShowcaseTap}
        className="hidden lg:flex relative w-full h-[calc(100vh-70px)] min-h-[720px] max-h-[960px] flex-col justify-between pt-24 pb-7 px-8 xl:px-14 overflow-hidden cursor-pointer select-none group"
        title="Click anywhere to spray detailing snow foam mist!"
      >
        {/* Full Screen Background Thar Studio Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/hero.jpg"
            alt="Mahindra Thar SUV in Clean Car Detailing Studio Jaipur"
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-1000 ease-out"
            fetchPriority="high"
          />

          {/* Cinematic Studio Dark Overlays for 100% Contrast & Legibility */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#070B12] via-[#070B12]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#070B12] via-[#070B12]/85 via-45% to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#070B12]/70 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#070B12]/70 to-transparent" />

          {/* Luminous Wash Wipe Wave */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-200/20 via-white/30 to-transparent wash-sweep-anim pointer-events-none" />

          {/* Overhead Hexagon Lighting Glow */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent overhead-light-anim pointer-events-none" />

          {/* PPF Scanning Grid (When PPF Mode Active) */}
          {activeBayMode === 'ppf' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent armor-scan-line shadow-[0_0_20px_#00E5FF]" />
            </div>
          )}

          {/* Ceramic High-Gloss Diamond Sweep (When Ceramic Mode Active) */}
          {activeBayMode === 'ceramic' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-300/25 to-transparent wash-sweep-anim" />
              <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white rounded-full blur-[2px] animate-ping" />
            </div>
          )}

          {/* Continuous Soap Foam Bubbles (Floating across the entire studio view) */}
          {continuousBubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="soap-bubble"
              style={{
                left: bubble.left,
                bottom: '-20px',
                width: `${bubble.size * 1.25}px`,
                height: `${bubble.size * 1.25}px`,
                animationDelay: bubble.delay,
                animationDuration: bubble.duration,
                ['--drift' as string]: bubble.drift,
              }}
            />
          ))}

          {/* Interactive Tap Bubbles & Spray Bursts */}
          {tapEffects.map((tap) => (
            <div
              key={tap.id}
              className="interactive-tap-burst"
              style={{
                left: `${tap.x - tap.size / 2}px`,
                top: `${tap.y - tap.size / 2}px`,
                width: `${tap.size * 1.4}px`,
                height: `${tap.size * 1.4}px`,
              }}
            />
          ))}
        </div>

        {/* TOP SECTION: Studio Badge + Headline + Status Tags */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-3 pointer-events-none">
          
          {/* Top Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#00E5FF]/30 shadow-lg pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">
              JAIPUR'S ELITE AUTO DETAILING STUDIO • MANSAROVAR
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-royal text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              DEFINING AUTOMOTIVE PERFECTION.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0066FF] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(0,102,255,0.7)]">
                UNRIVALED MIRROR GLOSS.
              </span>
            </h1>

            <p className="text-xs xl:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-md">
              Mansarovar's certified multi-bay studio on 200 Feet Bypass Road • Multi-stage paint correction, 10H ceramic shield & self-healing TPU armor engineered for Rajasthan's heat & dust.
            </p>
          </motion.div>

          {/* Live Tags Bar */}
          <div className="flex items-center justify-center gap-3 pt-1 pointer-events-auto">
            <span className="inline-flex items-center gap-2 bg-[#0B0F19]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#00E5FF]/40 text-xs font-bold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] -ml-4" />
              <span className="tracking-wider uppercase font-sans">
                {activeBayMode === 'bay' && 'STUDIO BAY 01 • LIVE MULTI-STAGE DETAILING'}
                {activeBayMode === 'foam' && 'ACTIVE FOAM WASH BAY'}
                {activeBayMode === 'ceramic' && '10H CERAMIC SHIELD BAY'}
                {activeBayMode === 'ppf' && 'TPU ARMOR APPLIED'}
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-[#0B0F19]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-500/40 text-xs font-bold text-emerald-400 font-sans shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>10H CERTIFIED GLOSS</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-[#0B0F19]/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/30 text-[11px] font-semibold text-cyan-200 shadow-lg">
              <Droplets className="w-3.5 h-3.5 text-[#00E5FF] animate-bounce" />
              <span>{hasTapped ? '🫧 Spraying Snow Foam Mist!' : '💧 Click car to spray foam & mist'}</span>
            </span>
          </div>

        </div>

        {/* BOTTOM SECTION: Floating Studio Cockpit (Controls + CTAs + 4 Stats in ONE fold!) */}
        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-3.5">
          
          {/* Controls Dock: Mode Switcher Tabs + Primary Action Buttons */}
          <div className="flex items-center justify-between gap-4 p-2 rounded-2xl bg-[#0B0F19]/90 backdrop-blur-xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            
            {/* 4 Mode Tabs */}
            <div className="flex items-center gap-1.5">
              {[
                { id: 'bay', label: 'Studio Bay', icon: '🚗' },
                { id: 'foam', label: 'Foam Wash', icon: '🧼' },
                { id: 'ceramic', label: '10H Ceramic', icon: '💎' },
                { id: 'ppf', label: 'TPU Armor', icon: '🛡️' }
              ].map((tab) => {
                const isActive = activeBayMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBayMode(tab.id as any);
                    }}
                    className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.5)] border border-white/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBooking();
                }}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,102,255,0.5)] border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span>Book Detailing Bay</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWhatsAppClick();
                }}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-emerald-500/50 shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Us</span>
              </button>
            </div>

          </div>

          {/* 4 Stats Cards in a Sleek Horizontal Dock */}
          <div className="grid grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-[#0B0F19]/85 backdrop-blur-md border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all group">
              <div className="font-sans text-xl xl:text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                99.8%
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200 font-sans mt-0.5">
                Swirl Removal
              </div>
              <div className="text-[10px] text-slate-400">
                3-Stage Paint Correction
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B0F19]/85 backdrop-blur-md border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all group">
              <div className="font-sans text-xl xl:text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                10H
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200 font-sans mt-0.5">
                Surface Shield
              </div>
              <div className="text-[10px] text-slate-400">
                Heat & Hard Water Proof
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B0F19]/85 backdrop-blur-md border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all group">
              <div className="font-sans text-xl xl:text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                10 Years
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200 font-sans mt-0.5">
                TPU Film Life
              </div>
              <div className="text-[10px] text-slate-400">
                Self-Healing Stone Guard
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B0F19]/85 backdrop-blur-md border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all group">
              <div className="font-sans text-xl xl:text-2xl font-black text-[#C4A574] group-hover:text-[#00E5FF] transition-colors">
                5.0 ★
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200 font-sans mt-0.5">
                Google Rated
              </div>
              <div className="text-[10px] text-slate-400">
                69+ Verified Jaipur Reviews
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. MOBILE VIEW: UNCHANGED & PRESERVED EXACTLY AS YOU LIKED IT! */}
      {/* ============================================================== */}
      <div className="block lg:hidden pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Top Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#00E5FF]/20 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">
              JAIPUR'S ELITE AUTO DETAILING STUDIO • MANSAROVAR
            </span>
          </motion.div>

          {/* Hero Title (Original, Bespoke, High-Impact) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-royal text-2xl sm:text-4xl font-black text-white tracking-tight leading-[1.1] uppercase">
              DEFINING AUTOMOTIVE PERFECTION.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0066FF] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(0,102,255,0.6)]">
                UNRIVALED MIRROR GLOSS.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans">
              Mansarovar's certified multi-bay studio on 200 Feet Bypass Road. Multi-stage paint correction, ultra-hydrophobic 10H ceramic shield & self-healing TPU armor engineered for Rajasthan's extreme heat, sand & hard water.
            </p>
          </motion.div>

          {/* Main Thar Showcase Window (UNCROPPED 16:10 / 16:9 Aspect Ratio) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full mx-auto"
          >
            {/* Outer Glowing Border Frame */}
            <div 
              ref={mobileShowcaseRef}
              onClick={handleShowcaseTap}
              onTouchStart={handleShowcaseTap}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 hover:border-[#00E5FF]/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-[#070B12] cursor-pointer group select-none transition-all duration-300"
              title="Tap anywhere to spray mist and foam!"
            >
              {/* The Mahindra Thar Image: 100% Fully Visible, Zero Cropping */}
              <img
                src="/assets/hero.jpg"
                alt="Mahindra Thar SUV in Clean Car Detailing Studio Jaipur undergoing ceramic wash and buff"
                className="w-full h-full object-cover sm:object-contain object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
                fetchPriority="high"
                loading="eager"
              />

              {/* Dynamic Wash Sheen & Water Wave Animation */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Luminous Water Wipe Wave */}
                <div className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-cyan-200/25 via-white/40 to-transparent wash-sweep-anim pointer-events-none" />

                {/* Overhead Hexagon Lighting Glow */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent overhead-light-anim pointer-events-none" />

                {/* Detailer Hand Cloth Buff Flare */}
                <div className="absolute top-[52%] left-[58%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-[#C4A574]/35 via-white/45 to-transparent blur-2xl cloth-buff-anim pointer-events-none" />
              </div>

              {/* PPF Scanning Grid (When PPF Mode Active) */}
              {activeBayMode === 'ppf' && (
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent armor-scan-line shadow-[0_0_15px_#00E5FF]" />
                </div>
              )}

              {/* Ceramic High-Gloss Diamond Sweep (When Ceramic Mode Active) */}
              {activeBayMode === 'ceramic' && (
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-300/25 to-transparent wash-sweep-anim" />
                  <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white rounded-full blur-[2px] animate-ping" />
                </div>
              )}

              {/* Continuous Detailing Soap Foam Bubbles (As requested!) */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                {continuousBubbles.map((bubble) => (
                  <div
                    key={bubble.id}
                    className="soap-bubble"
                    style={{
                      left: bubble.left,
                      bottom: '-20px',
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      animationDelay: bubble.delay,
                      animationDuration: bubble.duration,
                      ['--drift' as string]: bubble.drift,
                    }}
                  />
                ))}

                {/* Interactive Tap Bubbles & Spray Bursts */}
                {tapEffects.map((tap) => (
                  <div
                    key={tap.id}
                    className="interactive-tap-burst"
                    style={{
                      left: `${tap.x - tap.size / 2}px`,
                      top: `${tap.y - tap.size / 2}px`,
                      width: `${tap.size}px`,
                      height: `${tap.size}px`,
                    }}
                  />
                ))}
              </div>

              {/* Top-Left Live Status Tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 bg-[#0B0F19]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#00E5FF]/30 text-[10px] sm:text-xs font-bold text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] -ml-3.5" />
                <span className="tracking-wider uppercase font-sans">
                  {activeBayMode === 'bay' && 'STUDIO BAY 01'}
                  {activeBayMode === 'foam' && 'ACTIVE FOAM WASH'}
                  {activeBayMode === 'ceramic' && '10H CERAMIC SHIELD'}
                  {activeBayMode === 'ppf' && 'TPU ARMOR APPLIED'}
                </span>
              </div>

              {/* Top-Right Ceramic Spec Tag */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 bg-[#0B0F19]/85 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-[10px] sm:text-xs font-bold text-emerald-400 font-sans shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>10H CERTIFIED GLOSS</span>
              </div>

              {/* Bottom-Left Interactive Helper Pill */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2 bg-[#0B0F19]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-400/30 text-[10px] sm:text-[11px] font-semibold text-cyan-200 shadow-lg">
                <Droplets className="w-3.5 h-3.5 text-[#00E5FF] animate-bounce" />
                <span>{hasTapped ? '🫧 Spraying Snow Foam Mist!' : '💧 Tap car to spray foam & mist'}</span>
              </div>

            </div>

            {/* Bay Mode Switcher Tabs (4-Column Grid, Zero Scrollbar, 100% Mobile Clean) */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 mt-3 p-1 rounded-2xl bg-[#0D131F]/90 border border-white/10 max-w-xl mx-auto shadow-lg">
              {[
                { id: 'bay', fullLabel: 'Studio Bay', shortLabel: 'Studio', icon: '🚗' },
                { id: 'foam', fullLabel: 'Foam Wash', shortLabel: 'Foam', icon: '🧼' },
                { id: 'ceramic', fullLabel: '10H Ceramic', shortLabel: 'Ceramic', icon: '💎' },
                { id: 'ppf', fullLabel: 'TPU Armor', shortLabel: 'PPF Film', icon: '🛡️' }
              ].map((tab) => {
                const isActive = activeBayMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBayMode(tab.id as any)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.5)] border border-white/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{tab.icon}</span>
                    <span className="font-sans font-semibold text-[10px] sm:text-xs whitespace-nowrap">
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.fullLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Primary Action Buttons (Modern typography, high conversion, responsive) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 max-w-lg mx-auto pt-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Blue Button */}
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-bold text-sm tracking-wide font-sans shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:shadow-[0_0_35px_rgba(0,102,255,0.65)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Book Detailing Bay</span>
              </button>

              {/* Secondary WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#0D131F] hover:bg-[#111927] text-white font-bold text-sm tracking-wide font-sans border border-white/15 hover:border-emerald-500/50 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us Instant</span>
              </button>
            </div>

            {/* Feature Badge Pills Under CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-sans">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                <Droplets className="w-3 h-3 text-[#00E5FF]" /> Snow Foam Wash
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                <Shield className="w-3 h-3 text-[#38BDF8]" /> Self-Healing TPU
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                <Sparkles className="w-3 h-3 text-[#C4A574]" /> 10H Ceramic
              </span>
            </div>
          </motion.div>

          {/* 4-Card Studio Stats Grid (Original Clean Car Detailing Proof) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 text-left"
          >
            {/* Card 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D131F]/90 border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all duration-300 group">
              <div className="font-sans text-2xl sm:text-3xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                99.8%
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans mt-1">
                Swirl Removal
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                3-Stage Paint Correction
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D131F]/90 border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all duration-300 group">
              <div className="font-sans text-2xl sm:text-3xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                10H
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans mt-1">
                Surface Shield
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Heat & Hard Water Proof
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D131F]/90 border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all duration-300 group">
              <div className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors leading-tight">
                10 Years
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans mt-1">
                TPU Film Life
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Self-Healing Stone Guard
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D131F]/90 border border-white/10 hover:border-[#00E5FF]/40 shadow-lg transition-all duration-300 group">
              <div className="font-sans text-2xl sm:text-3xl font-black text-[#C4A574] group-hover:text-[#00E5FF] transition-colors">
                5.0 ★
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans mt-1">
                Google Rated
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                69+ Verified Jaipur Reviews
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};
