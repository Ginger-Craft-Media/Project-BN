import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePropertyStore } from '../lib/store';
import { MapPin, DollarSign, Clock, Home, Bath, Square } from 'lucide-react';

export default function TrackingPage() {
  const { listId } = useParams();
  const { lists, recordTraffic } = usePropertyStore();
  const list = lists.find((l) => l.id === listId);

  useEffect(() => {
    if (listId) {
      recordTraffic('Shared Link');
    }
  }, [listId, recordTraffic]);

  if (!list) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">List not found</h1>
          <p className="text-gray-600">The property list you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{list.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium properties, each carefully selected for quality and value.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.properties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Property Image */}
              <div className="relative h-48">
                {property.images.length > 0 ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Home size={48} className="text-white opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {property.furnishingStatus}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <p className="text-sm">{property.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Bath size={16} className="mr-2" />
                    <span className="text-sm">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square size={16} className="mr-2" />
                    <span className="text-sm">{property.superArea} sq.ft</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Rental Value</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ₹{property.rentalValue.toLocaleString()}/month
                    </p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{property.availability}</span>
                  </div>
                </div>

                <button 
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.href = `https://wa.me/+917620277729?text=Hi, I'm interested in ${encodeURIComponent(property.title)}`}
                >
                  Contact via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {list.properties.length === 0 && (
          <div className="text-center py-12">
            <Home size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl text-gray-600">No properties listed yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
}