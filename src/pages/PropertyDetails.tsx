import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyStore } from '../lib/store';
import { 
  MapPin, Bath, Square, Home, Calendar, DollarSign, Building,
  Shield, Key, Clock, Maximize, Users, ChevronRight, ChevronLeft,
  Send, MessageSquare, Phone
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, incrementPropertyMetric, addInquiry } = usePropertyStore();
  const property = properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Home size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleQRCodeDownload = () => {
    incrementPropertyMetric(property.id, 'qrCodeScans');
    // QR code download logic would go here
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      propertyId: property.id,
      ...inquiryForm,
      source: 'Form',
      status: 'New',
    });
    setShowContactForm(false);
    setInquiryForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in ${property.title} (${window.location.href})`;
    const whatsappUrl = `https://wa.me/+917620277729?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Find similar properties based on price range and location
  const similarProperties = properties
    .filter(p => 
      p.id !== property.id && 
      Math.abs(p.price - property.price) / property.price <= 0.2
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-[500px] bg-gray-100">
          {property.images.length > 0 ? (
            <>
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
              <Home size={64} className="text-white opacity-50" />
            </div>
          )}
        </div>

        {/* Property Information */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-lg text-gray-600 mb-2">by {property.developer}</p>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <p>{property.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Rental Value</p>
              <p className="text-2xl font-bold text-blue-600">₹{property.rentalValue.toLocaleString()}/month</p>
              <p className="text-sm text-gray-500 mt-2">Security Deposit</p>
              <p className="text-lg font-semibold text-gray-900">₹{property.securityDeposit.toLocaleString()}</p>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Bath size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Square size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Super Area</p>
                <p className="font-semibold">{property.superArea} sq.ft</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Building size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Floor</p>
                <p className="font-semibold">{property.floorNumber} of {property.totalFloors}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{property.constructionAge} years</p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Furnishing Status</span>
                  <span className="font-medium">{property.furnishingStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">{property.availability}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Overlooking</span>
                  <span className="font-medium">{property.overlooking.join(', ')}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Landmarks Nearby</h2>
              <div className="space-y-2">
                {property.landmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">{landmark}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tenant Preferences */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tenant Preferences</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.tenantPreferences.map((preference) => (
                <div key={preference} className="flex items-center">
                  <Users size={18} className="text-blue-500 mr-2" />
                  <span className="text-gray-600">{preference}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="flex flex-wrap gap-4 items-center justify-between border-t pt-8">
            <div className="flex gap-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <MessageSquare size={20} />
                Contact Agent
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Phone size={20} />
                WhatsApp
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <QRCodeSVG
                  value={window.location.href}
                  size={100}
                  level="H"
                  includeMargin={true}
                />
                <button
                  onClick={handleQRCodeDownload}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 block"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((similarProperty) => (
              <Link
                key={similarProperty.id}
                to={`/properties/${similarProperty.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100">
                  {similarProperty.images.length > 0 ? (
                    <img
                      src={similarProperty.images[0]}
                      alt={similarProperty.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                      <Home size={32} className="text-white opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{similarProperty.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{similarProperty.address}</p>
                  <p className="text-blue-600 font-semibold">
                    ₹{similarProperty.rentalValue.toLocaleString()}/month
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}