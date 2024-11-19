export interface Property {
  id: string;
  title: string;
  developer: string;
  price: number;
  rentalValue: number;
  securityDeposit: number;
  furnishingStatus: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  superArea: number;
  availability: 'Immediate' | 'Within 15 Days' | 'Within 30 Days' | 'After 30 Days';
  floorNumber: number;
  totalFloors: number;
  bathrooms: number;
  constructionAge: number;
  address: string;
  landmarks: string[];
  overlooking: string[];
  description: string;
  amenities: string[];
  images: string[];
  tenantPreferences: string[];
  createdAt: number;
  updatedAt: number;
  views: number;
  qrCodeScans: number;
  linkClicks: number;
}

export interface TrafficSource {
  id: string;
  name: string;
  visits: number;
  date: string;
}

export interface CustomerInquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: 'Form' | 'WhatsApp';
  createdAt: number;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Closed';
}