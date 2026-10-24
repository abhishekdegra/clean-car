export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  idealFor: string;
  features: string[];
  badge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  carModel: string;
  service: string;
  preferredDate: string;
  notes: string;
}
