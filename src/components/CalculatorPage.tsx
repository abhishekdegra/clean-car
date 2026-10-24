import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Car, 
  Droplets, 
  CheckCircle2, 
  Clock, 
  Award, 
  MessageCircle, 
  Calendar, 
  Flame, 
  Wind, 
  Zap,
  RotateCcw,
  Phone,
  Check
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface CalculatorPageProps {
  onBackToHome: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

// Vehicle Segments
interface VehicleSegment {
  id: string;
  name: string;
  tagline: string;
  examples: string;
  iconType: string;
  badge: string;
}

const VEHICLE_SEGMENTS: VehicleSegment[] = [
  {
    id: 'hatchback',
    name: 'Hatchback / Compact',
    tagline: 'City Cruisers & Compacts',
    examples: 'Swift, Baleno, i20, Altroz, Tiago, Polo',
    iconType: 'hatch',
    badge: 'Compact Paint Surface',
  },
  {
    id: 'sedan-csuv',
    name: 'Sedan / Compact SUV',
    tagline: 'Midsize & Daily Drivers',
    examples: 'Creta, Seltos, City, Verna, Virtus, Brezza, Nexon',
    iconType: 'sedan',
    badge: 'Popular Family Segment',
  },
  {
    id: 'mid-suv',
    name: 'Mid & Full SUV',
    tagline: 'Rugged 4x4 & Adventure SUVs',
    examples: 'Thar, Scorpio-N, XUV700, Safari, Harrier, Compass',
    iconType: 'suv',
    badge: 'Studio Signature Segment',
  },
  {
    id: 'luxury-flagship',
    name: 'Flagship & Luxury SUV',
    tagline: 'Full-Size & Premium Imports',
    examples: 'Fortuner, Defender, BMW, Mercedes, Audi, Gloster',
    iconType: 'luxury',
    badge: 'Maximum Surface Area',
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
    badge: 'Most Popular in Jaipur',
    badgeColor: 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10',
    tagline: 'Permanent chemical quartz bond for extreme wet mirror gloss, 110° hydrophobic water slide & swirl resistance.',
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
      'UV & Rajasthan hard borewell water defense',
      'Complimentary inspection after cure'
    ],
  },
  {
    id: 'ppf-front',
    title: 'High-Impact TPU PPF (Front Armor)',
    badge: 'Highway Stone Guard',
    badgeColor: 'border-blue-400/40 text-blue-400 bg-blue-500/10',
    tagline: 'Shields bumper, full bonnet, front fenders & mirror caps from flying gravel and highway stone chips.',
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
    badge: 'Ultimate Physical Defense',
    badgeColor: 'border-emerald-400/40 text-emerald-400 bg-emerald-500/10',
    tagline: 'Complete bumper-to-bumper physical TPU wrapping for lifetime original paint preservation.',
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
      'Hydrophobic top coat repels mud, sand and road tar',
      'Includes ceramic shield applied over the film surface',
      'Retains 100% factory original paint value'
    ],
  },
  {
    id: 'graphene-coating',
    title: 'Graphene Matrix Thermal Coating',
    badge: 'Rajasthan Desert Heat Spec',
    badgeColor: 'border-[#C4A574]/40 text-[#C4A574] bg-[#C4A574]/10',
    tagline: 'Carbon lattice technology that actively dissipates bonnet heat and repels dry sand dust.',
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
    tagline: 'Eliminates spiderwebs from rough daily cloth washes and restores deep showroom reflections.',
    duration: '4 to 8 Hours',
    warranty: 'Showroom Mirror Polish Guarantee',
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
    tagline: '140°C dry steam extraction, anti-bacterial AC duct fogging & non-greasy matte leather feed.',
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
    benefit: 'Repels corrosive high-heat brake dust, makes wheel cleaning effortless',
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

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onBackToHome, onOpenBooking }) => {
  // Wizard Step State: 1 = Car, 2 = Treatment, 3 = Addons, 4 = Final Quotation
  const [currentStep, setCurrentStep] = useState<number>(1);
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
      `Hello Clean Car Detailing Jaipur!\n\nI calculated an estimate on your website calculator:\n` +
      `🚗 Vehicle Segment: ${activeSegment.name} (${activeSegment.examples.split(',').slice(0, 3).join(', ')})\n` +
      `💎 Treatment: ${activeTreatment.title}\n` +
      (addonNames ? `✨ Add-ons: ${addonNames}\n` : '') +
      `💰 Estimated Investment: ${formatINR(totalPrice)}\n` +
      `⏱️ Duration: ${activeTreatment.duration}\n` +
      `🛡️ Warranty: ${activeTreatment.warranty}\n\n` +
      `Can I check bay slot availability at your Mansarovar, Jaipur studio?`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const stepsList = [
    { num: 1, label: 'Vehicle Class', short: 'Car' },
    { num: 2, label: 'Treatment', short: 'Service' },
    { num: 3, label: 'Add-Ons', short: 'Extras' },
    { num: 4, label: 'Quotation', short: 'Quote' },
  ];

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F1F5F9] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white pb-16">
      
      {/* Top Header with Back to Home & Phone Support */}
      <header className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-8 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E5FF] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Center Brand Title */}
          <div className="flex items-center gap-2">
            <span className="font-royal text-sm sm:text-lg font-black tracking-wider text-white">
              CLEAN CAR
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#00E5FF] font-sans uppercase px-1.5 py-0.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/25 leading-none">
              ESTIMATOR
            </span>
          </div>

          {/* Quick Call */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 hover:bg-[#0066FF]/30 text-white border border-[#0066FF]/40 text-xs font-bold transition-all"
            title="Call Clean Car Studio"
          >
            <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="hidden sm:inline">{BUSINESS_INFO.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full pt-6 sm:pt-10">
        
        {/* Step Progress Tracker Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {stepsList.map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`text-left p-2 sm:p-3 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'bg-[#0066FF]/15 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] ring-1 ring-[#00E5FF]'
                      : isPast
                      ? 'bg-white/5 border-[#00E5FF]/40 text-slate-300'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                      isActive
                        ? 'bg-[#00E5FF] text-[#070B12]'
                        : isPast
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-slate-400'
                    }`}>
                      {isPast ? '✓' : step.num}
                    </span>
                    <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Step {step.num}
                    </span>
                  </div>
                  <div className={`font-sans font-bold text-xs sm:text-sm truncate ${
                    isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    <span className="sm:hidden">{step.short}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT SWITCHER (Smooth transition between clean steps) */}
        <AnimatePresence mode="wait">
          
          {/* ================= STEP 1: CAR SEGMENT ================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
                  STEP 1 OF 4 • VEHICLE IDENTIFICATION
                </span>
                <h1 className="font-royal text-2xl sm:text-3xl font-black text-white uppercase">
                  Select Your Car Segment
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Chemical quantities and detailing hours depend on your car's surface area. Choose your segment below:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {VEHICLE_SEGMENTS.map((seg) => {
                  const isSelected = selectedSegment === seg.id;
                  return (
                    <div
                      key={seg.id}
                      onClick={() => setSelectedSegment(seg.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#0E1626] to-[#0A0F1A] border-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.2)] ring-1 ring-[#00E5FF]'
                          : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]' : 'bg-white/5 text-slate-400 group-hover:text-white'
                          }`}>
                            <Car className="w-6 h-6" />
                          </div>

                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            isSelected ? 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10' : 'border-white/10 text-slate-400'
                          }`}>
                            {seg.badge}
                          </span>
                        </div>

                        <h3 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-[#00E5FF] transition-colors">
                          {seg.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#00E5FF]/90 mt-0.5">
                          {seg.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 line-clamp-1 pr-2">
                          e.g. {seg.examples}
                        </span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-[#00E5FF] text-[#070B12]' : 'border border-white/20'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={onBackToHome}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Choose Treatment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: TREATMENT SELECTION ================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
                  <span>STEP 2 OF 4 • TREATMENT SELECTION</span>
                  <span>•</span>
                  <span className="text-slate-300">Car: {activeSegment.name}</span>
                </div>
                <h1 className="font-royal text-2xl sm:text-3xl font-black text-white uppercase">
                  Select Detailing Package
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every package includes multi-stage surface decontamination and precision paint wash:
                </p>
              </div>

              <div className="space-y-3">
                {TREATMENTS.map((treatment) => {
                  const isSelected = selectedTreatment === treatment.id;
                  const price = treatment.prices[selectedSegment];

                  return (
                    <div
                      key={treatment.id}
                      onClick={() => setSelectedTreatment(treatment.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0D182B] via-[#0B1322] to-[#0E1626] border-[#00E5FF] shadow-[0_0_25px_rgba(0,102,255,0.25)] ring-1 ring-[#00E5FF]'
                          : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${treatment.badgeColor}`}>
                            {treatment.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-sans">
                            <Clock className="w-3 h-3 text-[#00E5FF]" /> {treatment.duration}
                          </span>
                          <span className="text-[11px] text-[#C4A574] flex items-center gap-1 font-semibold">
                            <Award className="w-3 h-3 text-[#C4A574]" /> {treatment.warranty}
                          </span>
                        </div>

                        {/* Price Display */}
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] text-slate-400 block font-sans">Investment</span>
                          <span className="font-sans text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00E5FF]">
                            {formatINR(price)}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1 flex items-center gap-2">
                        {treatment.title}
                        {isSelected && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-semibold">
                            ✓ Selected
                          </span>
                        )}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-3">
                        {treatment.tagline}
                      </p>

                      {/* Included Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2.5 border-t border-white/10 text-[11px] text-slate-300">
                        {treatment.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Choose Add-Ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: STUDIO ADD-ONS ================= */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
                  <span>STEP 3 OF 4 • OPTIONAL ADD-ONS</span>
                </div>
                <h1 className="font-royal text-2xl sm:text-3xl font-black text-white uppercase">
                  Select Complementary Add-Ons
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Enhance your detailing package with specialized glass, wheel or underbody treatments (or skip to view final quote):
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none ${
                        isChecked
                          ? 'bg-[#0066FF]/15 border-[#00E5FF] shadow-[0_0_20px_rgba(0,102,255,0.25)] ring-1 ring-[#00E5FF]'
                          : 'bg-[#0D131F]/80 hover:bg-[#111928] border-white/10'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                        isChecked
                          ? 'bg-[#00E5FF] border-[#00E5FF] text-[#070B12]'
                          : 'border-white/30 bg-white/5'
                      }`}>
                        {isChecked && <span className="font-bold text-xs leading-none">✓</span>}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-sans font-bold text-sm text-white">
                            {addon.name}
                          </h4>
                          <span className="font-sans font-bold text-xs text-[#00E5FF] shrink-0">
                            +{formatINR(addon.price)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-2">
                          {addon.benefit}
                        </p>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Duration: {addon.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Running Total Preview */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-sans">Current Estimated Total</span>
                  <span className="font-sans text-xs text-[#00E5FF]">
                    {activeSegment.name} + {activeTreatment.title} ({selectedAddons.length} Add-on{selectedAddons.length !== 1 ? 's' : ''})
                  </span>
                </div>
                <div className="font-sans text-xl sm:text-2xl font-black text-white">
                  {formatINR(totalPrice)}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>View Final Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 4: FINAL QUOTATION INVOICE ================= */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  STEP 4 OF 4 • ESTIMATE READY
                </span>
                <h1 className="font-royal text-2xl sm:text-3xl font-black text-white uppercase">
                  Your Studio Quotation Summary
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Review your transparent package breakdown below. Ready to book your bay slot or WhatsApp our team:
                </p>
              </div>

              {/* Grand Invoice-style Card */}
              <div className="rounded-3xl bg-gradient-to-b from-[#0E1626] to-[#0A0F1A] border-2 border-[#00E5FF]/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#00E5FF] uppercase font-sans">
                      CLEAN CAR DETAILING STUDIO • MANSAROVAR, JAIPUR
                    </span>
                    <h2 className="font-royal text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
                      OFFICIAL STUDIO ESTIMATE
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-sans self-start sm:self-auto">
                    <Check className="w-3.5 h-3.5" />
                    <span>Zero Hidden Bay Surcharges</span>
                  </div>
                </div>

                {/* Breakdown Items Table */}
                <div className="py-5 space-y-3.5 font-sans text-xs sm:text-sm border-b border-white/10">
                  
                  {/* Car Segment */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-white block">{activeSegment.name}</span>
                      <span className="text-[11px] text-slate-400">Category: {activeSegment.examples}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold shrink-0">Included Base</span>
                  </div>

                  {/* Primary Service */}
                  <div className="flex items-start justify-between gap-4 pt-2 border-t border-white/5">
                    <div>
                      <span className="font-bold text-white block leading-snug">{activeTreatment.title}</span>
                      <span className="text-[11px] text-slate-400">{activeTreatment.tagline}</span>
                    </div>
                    <span className="font-bold text-white font-mono shrink-0">{formatINR(basePrice)}</span>
                  </div>

                  {/* Add-ons */}
                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
                        Selected Studio Add-Ons:
                      </span>
                      {selectedAddons.map((id) => {
                        const addon = ADD_ONS.find((a) => a.id === id);
                        if (!addon) return null;
                        return (
                          <div key={id} className="flex items-center justify-between text-xs text-slate-300 pl-2">
                            <span>• {addon.name}</span>
                            <span className="font-mono text-slate-300">+{formatINR(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Duration & Warranty Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#00E5FF] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">Est. Bay Turnaround Time</span>
                        <span className="font-bold text-white text-xs">{activeTreatment.duration}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-[#C4A574] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">Studio Guarantee</span>
                        <span className="font-bold text-[#C4A574] text-xs">{activeTreatment.warranty}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Final Total Investment */}
                <div className="pt-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block font-sans">
                      TOTAL ESTIMATED INVESTMENT
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Inclusive of complete multi-stage decontamination & prep
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-sans text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0066FF] to-[#38BDF8] drop-shadow-[0_0_25px_rgba(0,102,255,0.5)]">
                      {formatINR(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {/* Primary Blue Button */}
                  <button
                    onClick={() => onOpenBooking(activeTreatment.id)}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:shadow-[0_0_35px_rgba(0,102,255,0.65)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-cyan-200" />
                    <span>Reserve Detailing Slot</span>
                  </button>

                  {/* Secondary WhatsApp Button */}
                  <button
                    onClick={handleWhatsAppQuote}
                    className="py-3.5 px-6 rounded-2xl bg-[#0D131F] hover:bg-[#111928] text-white font-sans font-bold text-sm tracking-wide border border-white/15 hover:border-emerald-500/50 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp This Estimate</span>
                  </button>
                </div>

                {/* Modify Selections or Reset */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10 mt-5 text-xs text-slate-400">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recalculate Different Car</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={onBackToHome}
                    className="hover:text-[#00E5FF] cursor-pointer transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

    </div>
  );
};
