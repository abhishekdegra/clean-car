import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Sparkles, 
  Shield, 
  Droplets, 
  CheckCircle2, 
  Clock, 
  Award, 
  MessageCircle, 
  Calendar, 
  Flame, 
  Wind, 
  Zap,
  Info
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface PricingCalculatorProps {
  onOpenBooking: (serviceId?: string) => void;
}

// Vehicle Segments
interface VehicleSegment {
  id: string;
  name: string;
  tagline: string;
  examples: string;
  iconName: 'hatch' | 'sedan' | 'suv' | 'luxury';
}

const VEHICLE_SEGMENTS: VehicleSegment[] = [
  {
    id: 'hatchback',
    name: 'Hatchback / Compact',
    tagline: 'City Cruisers & Compacts',
    examples: 'Swift, Baleno, i20, Altroz, Tiago',
    iconName: 'hatch',
  },
  {
    id: 'sedan-csuv',
    name: 'Sedan / Compact SUV',
    tagline: 'Midsize & Daily Drivers',
    examples: 'Creta, Seltos, City, Verna, Virtus, Brezza',
    iconName: 'sedan',
  },
  {
    id: 'mid-suv',
    name: 'Mid & Full SUV',
    tagline: 'Rugged 4x4 & Adventure SUVs',
    examples: 'Thar, Scorpio-N, XUV700, Safari, Harrier',
    iconName: 'suv',
  },
  {
    id: 'luxury-flagship',
    name: 'Flagship & Luxury SUV',
    tagline: 'Full-Size & Premium Imports',
    examples: 'Fortuner, Defender, BMW, Mercedes, Audi',
    iconName: 'luxury',
  },
];

// Detailing Treatments
interface TreatmentOption {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  duration: string;
  warranty: string;
  prices: Record<string, number>;
  features: string[];
}

const TREATMENTS: TreatmentOption[] = [
  {
    id: 'ceramic-coating',
    title: '10H Nano Quartz Ceramic Coating',
    badge: 'Signature Studio Spec',
    badgeColor: 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10',
    tagline: 'Permanent chemical quartz bond for extreme wet mirror gloss & swirl defense.',
    duration: '1 to 2 Days',
    warranty: '5-Year Official Studio Warranty',
    prices: {
      hatchback: 13999,
      'sedan-csuv': 17999,
      'mid-suv': 22999,
      'luxury-flagship': 27999,
    },
    features: [
      'Multi-stage rotary & DA machine paint correction',
      'Dual-layer certified 10H quartz ceramic shield',
      '110° extreme hydrophobic contact angle',
      'UV & Rajasthan hard borewell water resistance',
      'Complimentary inspection after cure'
    ],
  },
  {
    id: 'ppf-front',
    title: 'High-Impact TPU PPF (Front Armor)',
    badge: 'Highway Stone Guard',
    badgeColor: 'border-blue-400/40 text-blue-400 bg-blue-500/10',
    tagline: 'Shields bumper, full bonnet, fenders & mirror caps from highway stone chips.',
    duration: '2 Days',
    warranty: '5-Year Self-Healing Film Warranty',
    prices: {
      hatchback: 24999,
      'sedan-csuv': 29999,
      'mid-suv': 36999,
      'luxury-flagship': 44999,
    },
    features: [
      'Optical-grade self-healing TPU elastomeric film',
      'Front bumper, full bonnet, front fenders & mirrors',
      'Instant scratch recovery under natural sun heat',
      'Computer-cut templates for zero blade contact on paint',
      'Non-yellowing optical clarity guarantee'
    ],
  },
  {
    id: 'ppf-full',
    title: 'Full Body 360° TPU PPF Armor',
    badge: 'Ultimate 360° Physical Armor',
    badgeColor: 'border-emerald-400/40 text-emerald-400 bg-emerald-500/10',
    tagline: 'Complete bumper-to-bumper physical TPU wrapping for lifetime paint preservation.',
    duration: '3 to 4 Days',
    warranty: '10-Year Comprehensive Warranty',
    prices: {
      hatchback: 58000,
      'sedan-csuv': 72000,
      'mid-suv': 89000,
      'luxury-flagship': 115000,
    },
    features: [
      '100% exterior painted panel coverage with wrapped edges',
      'Guards against keys, tight parking scratches, flying gravel & bush marks',
      'Hydrophobic top coat repels mud and road tar',
      'Includes ceramic shield applied over the film surface',
      'Retains 100% factory original paint value'
    ],
  },
  {
    id: 'graphene-coating',
    title: 'Graphene Matrix Thermal Coating',
    badge: 'Rajasthan Desert Heat Spec',
    badgeColor: 'border-[#C4A574]/40 text-[#C4A574] bg-[#C4A574]/10',
    tagline: 'Carbon lattice technology that lowers bonnet surface heat and repels dry sand dust.',
    duration: '1 to 2 Days',
    warranty: '5-Year High Heat Durability',
    prices: {
      hatchback: 16999,
      'sedan-csuv': 21999,
      'mid-suv': 26999,
      'luxury-flagship': 32999,
    },
    features: [
      'Graphene nanoplatelets dissipate intense solar bonnet heat',
      'Anti-static properties actively repel airborne Jaipur sand',
      'Zero mineral water spot etching even in hard water',
      'Deep obsidian gloss with ultra-slick hydrophobic slide',
      'Multi-year chemical resistance against bird droppings & bug acid'
    ],
  },
  {
    id: 'paint-correction',
    title: 'Signature Paint Correction & Jeweling',
    badge: 'Swirl & Scratch Revival',
    badgeColor: 'border-purple-400/40 text-purple-400 bg-purple-500/10',
    tagline: 'Removes up to 95% of wash swirls, spiderwebs & haze to restore original showroom depth.',
    duration: '4 to 8 Hours',
    warranty: 'Immediate Showroom Mirror Polish',
    prices: {
      hatchback: 4999,
      'sedan-csuv': 6499,
      'mid-suv': 7999,
      'luxury-flagship': 9999,
    },
    features: [
      'Electronic digital clear coat depth gauge inspection',
      '3-stage compound, medium cut & ultra-fine jeweling polish',
      'Eliminates spiderwebs from rough daily cloth washes',
      'Daylight high-CRI defect mapping under hex studio lights',
      'Sealed with protective synthetic fluoropolymer glaze'
    ],
  },
  {
    id: 'interior-cleaning',
    title: 'Medical Steam Interior Deep Sanitization',
    badge: '100% Germ & Odor Free',
    badgeColor: 'border-cyan-400/40 text-cyan-400 bg-cyan-500/10',
    tagline: 'High-temperature dry steam extraction, anti-bacterial AC fogging & matte leather care.',
    duration: '4 to 6 Hours',
    warranty: 'Deep Clean Hygiene Guarantee',
    prices: {
      hatchback: 2499,
      'sedan-csuv': 3199,
      'mid-suv': 3899,
      'luxury-flagship': 4499,
    },
    features: [
      '140°C dry steam extraction removes stains & sanitizes fabric fibers',
      'Gentle PH-balanced leather cleaning with non-greasy matte feed',
      'AC evaporator duct antibacterial fogging eliminates musty odors',
      'Boot bay, roof liner & spare tire well thoroughly scrubbed',
      'Zero sticky or shiny silicone spray used'
    ],
  },
];

// Add-on Options
interface AddOnOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefit: string;
  icon: React.FC<{ className?: string }>;
}

const ADD_ONS: AddOnOption[] = [
  {
    id: 'alloy-ceramic',
    name: 'Alloy Wheels 9H Ceramic Armor',
    price: 2499,
    duration: '+1 hr',
    benefit: 'Repels corrosive high-heat brake dust, makes routine wash effortless',
    icon: Zap,
  },
  {
    id: 'windshield-repellent',
    name: 'Windshield & Glass Hydrophobic Shield',
    price: 1999,
    duration: '+1 hr',
    benefit: '120° water slide angle for crystal-clear night & monsoon rain vision',
    icon: Droplets,
  },
  {
    id: 'engine-steam',
    name: 'Engine Bay Steam & UV Dressing',
    price: 1499,
    duration: '+1.5 hrs',
    benefit: 'Moisture-safe electrical sensor cleaning with heat-resistant hose dressing',
    icon: Flame,
  },
  {
    id: 'silencer-zinc',
    name: 'Silencer 600°C Zinc Anti-Rust Coating',
    price: 1299,
    duration: '+1 hr',
    benefit: 'Exhaust wire-buffing and thermal zinc coating to prevent underbody rust',
    icon: Wind,
  },
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('mid-suv');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('ceramic-coating');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['windshield-repellent']);

  // Get current active selections
  const activeSegment = useMemo(
    () => VEHICLE_SEGMENTS.find((s) => s.id === selectedSegment) || VEHICLE_SEGMENTS[2],
    [selectedSegment]
  );

  const activeTreatment = useMemo(
    () => TREATMENTS.find((t) => t.id === selectedTreatment) || TREATMENTS[0],
    [selectedTreatment]
  );

  // Toggle Add-on
  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Pricing Calculation
  const basePrice = activeTreatment.prices[selectedSegment] || 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADD_ONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + addonsTotal;

  // Format currency in Indian Rupees
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // WhatsApp Enquiry with formatted estimate
  const handleWhatsAppQuote = () => {
    const addonNames = selectedAddons
      .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = encodeURIComponent(
      `Hello Clean Car Detailing Jaipur!\n\nI calculated an estimate on your website:\n` +
      `🚗 Vehicle Segment: ${activeSegment.name} (e.g. ${activeSegment.examples})\n` +
      `💎 Treatment: ${activeTreatment.title}\n` +
      (addonNames ? `✨ Add-ons: ${addonNames}\n` : '') +
      `💰 Estimated Investment: ${formatINR(totalPrice)}\n` +
      `⏱️ Duration: ${activeTreatment.duration}\n\n` +
      `Can I check slot availability at your Mansarovar, Jaipur studio?`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing-calculator" className="relative py-20 sm:py-28 overflow-hidden bg-[#070B12] scroll-mt-20">
      
      {/* Background Studio Glow Effects */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#0066FF]/15 via-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none -z-10"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#C4A574]/10 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#00E5FF]/25 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">
              JAIPUR STUDIO DETAILING ESTIMATOR
            </span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            TRANSPARENT DETAILING PACKAGES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0066FF] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(0,102,255,0.6)]">
              CALCULATE YOUR INVESTMENT.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans">
            Select your vehicle class and desired studio treatment below. Every package includes comprehensive chemical decontamination, multi-stage paint wash, and zero hidden bay surcharges.
          </p>
        </div>

        {/* STEP 1: Vehicle Segment Selection */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white text-xs font-bold flex items-center justify-center font-sans shadow-[0_0_10px_rgba(0,229,255,0.4)]">
              1
            </span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
              SELECT YOUR VEHICLE SEGMENT
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {VEHICLE_SEGMENTS.map((seg) => {
              const isSelected = selectedSegment === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative border cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#0E1626] to-[#0B101C] border-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.25)] ring-1 ring-[#00E5FF]'
                      : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.5)]' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}>
                      <Car className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#00E5FF] text-[#070B12] flex items-center justify-center font-bold text-xs shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                    {seg.name}
                  </div>
                  <div className="text-[11px] font-semibold text-[#00E5FF]/90 mt-0.5">
                    {seg.tagline}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 mt-2 line-clamp-1">
                    e.g. {seg.examples}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CALCULATOR GRID: Treatment Choices + Sticky Quotation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7-8 COLS: Treatment Selection & Addons */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            
            {/* STEP 2: Treatment Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white text-xs font-bold flex items-center justify-center font-sans shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  2
                </span>
                <h3 className="font-royal text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                  CHOOSE PRIMARY STUDIO TREATMENT
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {TREATMENTS.map((treatment) => {
                  const isSelected = selectedTreatment === treatment.id;
                  const price = treatment.prices[selectedSegment];

                  return (
                    <div
                      key={treatment.id}
                      onClick={() => setSelectedTreatment(treatment.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0D182B] via-[#0B1322] to-[#0E1626] border-[#00E5FF] shadow-[0_0_30px_rgba(0,102,255,0.2)] ring-1 ring-[#00E5FF]'
                          : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${treatment.badgeColor}`}>
                            {treatment.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#00E5FF]" /> {treatment.duration}
                          </span>
                        </div>

                        {/* Price Tag */}
                        <div className="text-left sm:text-right">
                          <span className="text-xs text-slate-400 font-sans block">Estimated Base</span>
                          <span className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors">
                            {formatINR(price)}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-sans font-bold text-base sm:text-lg text-white mb-1.5 flex items-center gap-2">
                        {treatment.title}
                        {isSelected && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-semibold">
                            Selected
                          </span>
                        )}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-3">
                        {treatment.tagline}
                      </p>

                      {/* Expandable / Included Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-3 border-t border-white/10 text-[11px] sm:text-xs text-slate-300">
                        {treatment.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Warranty Strip */}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#C4A574] font-semibold">
                        <Award className="w-3.5 h-3.5 text-[#C4A574] shrink-0" />
                        <span>{treatment.warranty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Recommended Studio Add-Ons */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white text-xs font-bold flex items-center justify-center font-sans shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  3
                </span>
                <h3 className="font-royal text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                  RECOMMENDED STUDIO ADD-ONS (OPTIONAL)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-[#0066FF]/15 border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,102,255,0.2)]'
                          : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10'
                      }`}
                    >
                      {/* Checkbox box */}
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                        isChecked
                          ? 'bg-[#00E5FF] border-[#00E5FF] text-[#070B12]'
                          : 'border-white/30 bg-white/5'
                      }`}>
                        {isChecked && <span className="font-bold text-xs leading-none">✓</span>}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-sans font-bold text-xs sm:text-sm text-white truncate">
                            {addon.name}
                          </span>
                          <span className="font-sans font-bold text-xs text-[#00E5FF] shrink-0">
                            +{formatINR(addon.price)}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {addon.benefit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT 5-4 COLS: Sticky Quotation Breakdown Card */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-gradient-to-b from-[#0E1626] to-[#0A0F1A] border-2 border-[#00E5FF]/30 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              
              {/* Top Card Ambient Glow */}
              <div 
                aria-hidden="true" 
                className="absolute top-0 right-0 w-44 h-44 bg-[#0066FF]/20 rounded-full blur-2xl pointer-events-none" 
              />

              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] font-sans">
                    STUDIO QUOTATION
                  </span>
                  <h4 className="font-royal text-lg sm:text-xl font-black text-white uppercase mt-0.5">
                    ESTIMATE SUMMARY
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C4A574]">
                  <Shield className="w-5 h-5" />
                </div>
              </div>

              {/* Summary Items */}
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                
                {/* Vehicle Segment */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/5">
                  <span className="text-slate-400">Vehicle Class:</span>
                  <div className="text-right">
                    <span className="font-bold text-white block">{activeSegment.name}</span>
                    <span className="text-[10px] text-slate-400">({activeSegment.examples.split(',')[0].trim()})</span>
                  </div>
                </div>

                {/* Selected Treatment */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/5">
                  <span className="text-slate-400">Primary Treatment:</span>
                  <div className="text-right max-w-[190px]">
                    <span className="font-bold text-white block leading-snug">{activeTreatment.title}</span>
                    <span className="text-[11px] font-bold text-[#00E5FF]">{formatINR(basePrice)}</span>
                  </div>
                </div>

                {/* Selected Add-ons */}
                {selectedAddons.length > 0 ? (
                  <div className="pb-3 border-b border-white/5">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span>Studio Add-ons ({selectedAddons.length}):</span>
                      <span className="font-bold text-[#00E5FF]">+{formatINR(addonsTotal)}</span>
                    </div>
                    <div className="space-y-1">
                      {selectedAddons.map((id) => {
                        const addon = ADD_ONS.find((a) => a.id === id);
                        if (!addon) return null;
                        return (
                          <div key={id} className="flex items-center justify-between text-[11px] text-slate-300">
                            <span className="truncate pr-2">• {addon.name}</span>
                            <span className="text-slate-400 font-mono">+{formatINR(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-white/5">
                    <span>Studio Add-ons:</span>
                    <span>None selected</span>
                  </div>
                )}

                {/* Duration & Warranty Badges */}
                <div className="grid grid-cols-2 gap-2 py-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Est. Bay Time</span>
                    <span className="font-bold text-white text-xs flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#00E5FF]" /> {activeTreatment.duration}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Studio Guarantee</span>
                    <span className="font-bold text-[#C4A574] text-[11px] flex items-center gap-1 mt-0.5 truncate" title={activeTreatment.warranty}>
                      <Award className="w-3 h-3 text-[#C4A574] shrink-0" /> Warranty Incl.
                    </span>
                  </div>
                </div>

                {/* Total Investment Highlight */}
                <div className="pt-3 pb-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block font-sans">
                        ESTIMATED TOTAL
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Zero hidden bay fees • Clean Car Studio
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                        {formatINR(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA: Book Package */}
                <button
                  onClick={() => onOpenBooking(activeTreatment.id)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:shadow-[0_0_35px_rgba(0,102,255,0.65)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Calendar className="w-4 h-4 text-cyan-200" />
                  <span>Reserve This Package</span>
                </button>

                {/* Secondary CTA: WhatsApp Estimate */}
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3 px-4 rounded-2xl bg-[#0D131F] hover:bg-white/5 text-white font-sans font-bold text-xs tracking-wide border border-white/15 hover:border-emerald-500/50 shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp This Estimate</span>
                </button>

                {/* Trust Note */}
                <div className="flex items-center gap-1.5 justify-center pt-2 text-[10px] text-slate-400 text-center">
                  <Info className="w-3 h-3 text-[#00E5FF] shrink-0" />
                  <span>Exact quotation finalized after complimentary studio paint audit.</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
