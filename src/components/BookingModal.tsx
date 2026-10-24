import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageCircle, AlertCircle, Car, Sparkles, User, Phone, Shield } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/content';
import type { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

const TODAY_ISO_DATE = new Date().toISOString().split('T')[0];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [formData, setFormData] = useState<BookingFormData>(() => {
    const matched = preselectedServiceId
      ? (SERVICES.find((s) => s.id === preselectedServiceId) ||
         (preselectedServiceId.startsWith('ppf') ? SERVICES.find((s) => s.id === 'ppf') : undefined))
      : undefined;
    return {
      fullName: '',
      phone: '',
      carModel: '',
      service: matched?.title || SERVICES[0]?.title || '',
      preferredDate: '',
      notes: '',
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevPreselected, setPrevPreselected] = useState<string | undefined>(preselectedServiceId);

  if (preselectedServiceId !== prevPreselected) {
    setPrevPreselected(preselectedServiceId);
    if (preselectedServiceId) {
      const matched = SERVICES.find((s) => s.id === preselectedServiceId) ||
        (preselectedServiceId.startsWith('ppf') ? SERVICES.find((s) => s.id === 'ppf') : undefined);
      if (matched) {
        setFormData((prev) => ({ ...prev, service: matched.title }));
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const popularCars = [
    'Mahindra Thar',
    'Toyota Fortuner',
    'Hyundai Creta',
    'Mahindra Scorpio-N',
    'Tata Safari',
    'BMW / Mercedes'
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Please provide your vehicle make and model.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a detailing treatment.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please pick a preferred date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const messageParts = [
      `*New Studio Detailing Booking Request — Clean Car Detailing Jaipur*`,
      ``,
      `*Customer Name:* ${formData.fullName.trim()}`,
      `*Phone Number:* ${formData.phone.trim()}`,
      `*Vehicle Model:* ${formData.carModel.trim()}`,
      `*Selected Treatment:* ${formData.service}`,
      `*Preferred Date:* ${formData.preferredDate}`,
    ];

    if (formData.notes.trim()) {
      messageParts.push(`*Special Request / Paint Condition:* ${formData.notes.trim()}`);
    }

    messageParts.push(``);
    messageParts.push(`Please confirm slot availability at Mansarovar studio.`);

    const formattedMessage = messageParts.join('\n');
    const waUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-[#0D131F] w-full max-w-lg rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-auto z-10 text-left animate-in fade-in zoom-in-95 duration-200 text-white"
      >
        {/* Top Header Banner */}
        <div className="bg-[#070B12] p-6 text-white relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#9E7D47] via-[#F3E7D3] to-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
              <div className="w-full h-full rounded-full bg-[#070B12] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Clean Car Detailing Crest"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00E5FF] font-royal uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mansarovar Studio Bay</span>
              </div>
              <h2 id="modal-title" className="font-royal text-xl sm:text-2xl font-bold tracking-wide mt-0.5 text-white">
                Book Detailing Treatment
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                200ft Bypass Road, Mansarovar • Direct WhatsApp Confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vikramaditya Singh"
                className={`w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-xl border ${
                  errors.fullName ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-[#070B12]'
                } focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white placeholder-slate-500`}
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 sm:top-3" />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              WhatsApp Contact Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 98290 12345"
                className={`w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-xl border ${
                  errors.phone ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-[#070B12]'
                } focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white placeholder-slate-500`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 sm:top-3" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Vehicle Make / Model */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              Vehicle Make & Model <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.carModel}
                onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                placeholder="e.g. Mahindra Thar Roxx / Fortuner"
                className={`w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-xl border ${
                  errors.carModel ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-[#070B12]'
                } focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white placeholder-slate-500`}
              />
              <Car className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 sm:top-3" />
            </div>
            {/* Quick Car Selection Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-[#00E5FF] font-bold self-center mr-1">Popular:</span>
              {popularCars.map((car) => (
                <button
                  type="button"
                  key={car}
                  onClick={() => setFormData({ ...formData, carModel: car })}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors font-medium cursor-pointer"
                >
                  {car}
                </button>
              ))}
            </div>
            {errors.carModel && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.carModel}
              </p>
            )}
          </div>

          {/* Detailing Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              Select Detailing Treatment <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-xl border ${
                errors.service ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-[#070B12]'
              } focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white`}
            >
              <option value="" className="bg-[#070B12] text-white">-- Choose a package --</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title} className="bg-[#070B12] text-white">
                  {s.title} ({s.duration})
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.service}
              </p>
            )}
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={TODAY_ISO_DATE}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className={`w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-xl border ${
                  errors.preferredDate ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-[#070B12]'
                } focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 sm:top-3 pointer-events-none" />
            </div>
            {errors.preferredDate && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
              </p>
            )}
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-royal mb-1.5">
              Specific Notes / Requests (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Swirl marks from dry cloth washing, borewell hard water stains on glass, or PPF requirements."
              className="w-full px-4 py-2 text-sm rounded-xl border border-white/10 bg-[#070B12] focus:outline-none focus:ring-2 focus:ring-[#00E5FF] text-white placeholder-slate-500"
            />
          </div>

          {/* Explanatory Note */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-start gap-2.5 text-[11px] text-slate-300 leading-relaxed">
            <Shield className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span>
              <strong>Direct WhatsApp Slot Confirmation:</strong> Submitting will instantly open WhatsApp with your entered car details prefilled. Our team in Mansarovar will confirm slot availability and quote customized pricing.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white" />
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Enquiry on WhatsApp'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
