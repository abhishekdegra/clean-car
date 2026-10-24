import type { ServiceItem, ReviewItem, BeforeAfterItem, FaqItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Clean Car Detailing',
  tagline: 'Your Car Deserves a Showroom Finish',
  subheading: 'Jaipur’s premier studio for Ceramic Coating, Paint Protection Film (PPF), and deep interior restoration. Engineered for Rajasthan’s intense sun, dust, and hard water.',
  phoneDisplay: '+91 89630 34363',
  phoneRaw: '+918963034363',
  whatsappNumber: '918963034363',
  address: 'Near NIFD Global / Kamla Poddar Group, 200 Feet Bypass Road, Mansarovar, Jaipur, Rajasthan 302020',
  shortAddress: '200 Feet Bypass Road, Mansarovar, Jaipur',
  googleRating: 5.0,
  googleReviewCount: 69,
  openingHours: 'Mon – Sun: 9:30 AM – 8:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Clean+Car+Detailing+Mansarovar+Jaipur',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.63009587422!2d75.7482!3d26.8524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ef90f94677%3A0xb3a2298e826b5c3b!2sMansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating (9H/10H)',
    tagline: 'Ultra-Gloss Nano Quartz Shield',
    description: 'Forms a permanent chemical glass bond over your clear coat. Creates an extreme hydrophobic barrier that repels dust, UV oxidation, and hard borewell water stains.',
    image: '/assets/fortuner-ceramic.jpg',
    duration: '1 to 2 Days',
    idealFor: 'Thar, Fortuner, Creta, Safari & luxury sedans wanting showroom shine',
    badge: 'Signature Studio Treatment',
    features: [
      'Multi-stage machine paint correction',
      'True 9H/10H hardness quartz bond',
      '110° extreme water contact angle',
      'UV & high-temperature paint defense',
      'Complimentary inspection after cure'
    ]
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film (PPF)',
    tagline: 'Self-Healing Optically Clear Armor',
    description: 'High-grade TPU film engineered to shield high-impact panels from flying gravel, tight parking scratches, and road debris on Jaipur highways. Micro-scratches heal in the sun.',
    image: '/assets/ppf-installation.jpg',
    duration: '2 to 4 Days',
    idealFor: 'New cars, highway commuters, and vehicles seeking physical protection',
    badge: 'Ultimate Physical Defense',
    features: [
      'Instant self-healing elastomeric top coat',
      'Surgical wrapped edges for invisible look',
      'Guards against highway stone chips',
      'Non-yellowing optical clarity',
      'Preserves factory paint value'
    ]
  },
  {
    id: 'graphene-coating',
    title: 'Graphene Matrix Coating',
    tagline: 'Heat Dissipation & Anti-Static Shield',
    description: 'Infused with carbon graphene lattice. Lowers surface temperature on dark cars in peak summer heat, repels dry airborne dust, and prevents mineral etching.',
    image: '/assets/graphene-coating.jpg',
    duration: '1 to 2 Days',
    idealFor: 'Black and dark cars prone to water spotting and dust accumulation',
    badge: 'Advanced Climate Spec',
    features: [
      'Dissipates bonnet surface heat',
      'Anti-static dust repellency',
      'Prevents mineral spot etching',
      'Ultra-slick hydrophobic wash ease',
      'Multi-year chemical resistance'
    ]
  },
  {
    id: 'paint-correction',
    title: 'Car Polishing & Paint Correction',
    tagline: 'Removes 85–95% of Wash Swirl Marks',
    description: 'Eliminates spiderweb scratches and buffer trails caused by daily rough cloth washes. Uses precision dual-action polishers under 4,000K daylight inspection lamps.',
    image: '/assets/paint-correction.jpg',
    duration: '4 to 8 Hours',
    idealFor: 'Cars with swirl marks, hazy clear coat, or light surface scratches',
    badge: 'Master Jeweling',
    features: [
      'Digital panel clear coat depth check',
      'Multi-stage compound & jeweling polish',
      'Safely eliminates up to 95% of swirls',
      'High-CRI LED defect inspection',
      'Sealed with protective synthetic glaze'
    ]
  },
  {
    id: 'interior-cleaning',
    title: 'Interior Deep Cleaning / Dry Cleaning',
    tagline: 'Steam Sanitization & Matte Leather Care',
    description: 'Medical dry steam extraction targeting deep carpet grime, leather pores, and AC duct bacteria. Restores a clean, non-greasy factory matte finish.',
    image: '/assets/interior-detailing.jpg',
    duration: '4 to 6 Hours',
    idealFor: 'Leather & fabric cabins, odor elimination, and stain removal',
    badge: 'Hygiene & Comfort',
    features: [
      'High-temp dry steam sanitization',
      'Gentle leather cleaning & conditioning',
      'AC vent antibacterial fogging',
      'Zero sticky or shiny silicone spray',
      'Boot and spare wheel bay scrubbing'
    ]
  },
  {
    id: 'teflon-coating',
    title: 'Teflon Coating & Polymer Sealant',
    tagline: 'Silky Gloss & Value Dust Defense',
    description: 'A fluoropolymer synthetic sealant that fills clear coat microscopic pores. Leaves an ultra-slick surface that makes routine washing quick and easy.',
    image: '/assets/teflon-coating.jpg',
    duration: '3 to 5 Hours',
    idealFor: 'Annual maintenance and periodic gloss touch-ups',
    badge: 'Slick Everyday Care',
    features: [
      'Snow foam wash & clay bar decontamination',
      'Machine buffed fluoropolymer sealant',
      'Noticeably silky dust-repellent finish',
      'Shield against light water spots',
      'Cost-effective seasonal protection'
    ]
  },
  {
    id: 'engine-silencer-coating',
    title: 'Engine Bay & Silencer Anti-Rust',
    tagline: 'Thermal & Anti-Corrosive Protection',
    description: 'Specialized dry detailing for engine compartments and high-heat exhaust mufflers. Protects exposed metal from monsoon rainwater and road grime.',
    image: '/assets/engine-bay.jpg',
    duration: '2 to 4 Hours',
    idealFor: 'Monsoon readiness, SUV underbodies, and preventive care',
    badge: 'Heavy Duty Protection',
    features: [
      'Dry steam bay cleaning with sensor protection',
      'Silencer exhaust wire-brushing & zinc coat',
      'Non-conductive satin UV hose dressing',
      'Heat tolerance up to 600°C',
      'Prevents underbody rust formation'
    ]
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'paint-swirls',
    title: 'Paint Correction & Ceramic Restoration',
    category: 'Paint Correction',
    description: 'Spiderweb wash swirls and haze safely leveled into a 100% mirror reflection under high-intensity inspection lamps in our Mansarovar studio.',
    beforeImage: '/assets/paint-before.jpg',
    afterImage: '/assets/paint-after.jpg',
    beforeLabel: 'Before: Swirl Marked & Dull',
    afterLabel: 'After: True Mirror Reflection'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    author: 'Vikramaditya S.',
    vehicle: 'Mahindra Thar Roxx',
    rating: 5,
    date: 'Mansarovar, Jaipur',
    comment: 'Got full PPF and 10H ceramic on my black Thar. The mirror gloss is spectacular. In Jaipur dust, routine cleaning takes just a quick wipe. Very professional studio.',
    verified: true
  },
  {
    id: '2',
    author: 'Dr. Sunil Sharma',
    vehicle: 'Toyota Fortuner Legender',
    rating: 5,
    date: 'Vaishali Nagar, Jaipur',
    comment: 'The 200ft bypass studio is convenient to access. 2-stage correction and graphene coating on my pearl white Fortuner completely stopped borewell water stains. Top notch!',
    verified: true
  },
  {
    id: '3',
    author: 'Ananya C.',
    vehicle: 'Hyundai Creta Knight',
    rating: 5,
    date: 'Malviya Nagar, Jaipur',
    comment: 'Society wash cloth had ruined the paint with swirl marks. Clean Car Detailing restored it to showroom state. Interior dry cleaning made the leather feel brand new.',
    verified: true
  },
  {
    id: '4',
    author: 'Mohit Agarwal',
    vehicle: 'Tata Safari Dark Edition',
    rating: 5,
    date: 'C-Scheme, Jaipur',
    comment: 'Transparent and honest detailers. They showed digital paint depth readings before starting machine work. Quick WhatsApp appointment booking. Highly recommended.',
    verified: true
  }
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Choose Treatment',
    description: 'Select Ceramic, Graphene, Self-Healing PPF, or deep interior dry cleaning tailored to your car.'
  },
  {
    step: '02',
    title: 'Share Vehicle Details',
    description: 'Tell us your car make (Thar, Fortuner, Creta, Safari, BMW) and your preferred inspection date.'
  },
  {
    step: '03',
    title: 'WhatsApp Confirmation',
    description: 'One tap connects directly with our studio manager (+91 89630 34363) to confirm slot and pricing.'
  },
  {
    step: '04',
    title: 'Showroom Delivery',
    description: 'Bring your car to our 200ft Bypass studio. Drive out with an immaculate showroom mirror finish.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'How does Ceramic Coating protect against hard water and sun in Jaipur?',
    answer: 'Jaipur ground water has high TDS minerals that bake into clear coat under summer sun. Our 9H ceramic creates a glass shield with 110° water beading, making water slide off before minerals can etch.'
  },
  {
    question: 'Why choose PPF over only ceramic coating for highway driving?',
    answer: 'On Jaipur-Delhi or Ajmer highways, flying gravel stone chips chip raw paint. Ceramic provides chemical gloss, while PPF is an elastomeric physical TPU film that absorbs stones and self-heals scratches in the sun.'
  },
  {
    question: 'Can you safely remove swirl marks from society car washes?',
    answer: 'Yes. Over 90% of swirls come from dry cloth wiping. Our multi-stage machine compounding safely levels these fine micro-marrings under 4,000K inspection lights to restore flawless mirror reflection.'
  },
  {
    question: 'Where is Clean Car Detailing located in Jaipur?',
    answer: 'Near NIFD Global / Kamla Poddar Group on 200 Feet Bypass Road, Mansarovar, Jaipur 302020. Easily reached from Vaishali Nagar, Gopalpura Bypass, and Ajmer Road.'
  },
  {
    question: 'How do I book an appointment?',
    answer: 'Click "Book Detailing" or the WhatsApp button. Select your vehicle and date, and a prefilled message will open directly in WhatsApp to confirm your slot.'
  }
];
