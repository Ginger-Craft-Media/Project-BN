import { Link } from 'react-router-dom';
import { Home, MapPin, Bath, Square, Plus } from 'lucide-react';
import { Property } from '../lib/types';
import { useState } from 'react';
import { usePropertyStore } from '../lib/store';

interface PropertyCardProps {
  property: Property;
  showListOptions?: boolean;
}

export default function PropertyCard({ property, showListOptions = true }: PropertyCardProps) {
  const { lists, addPropertyToList } = usePropertyStore();
  const [showListMenu, setShowListMenu] = useState(false);

  const handleAddToList = (listId: string) => {
    addPropertyToList(listId, property);
    setShowListMenu(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          {property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Home size={48} className="text-white opacity-50" />
            </div>
          )}
          <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
            {property.furnishingStatus}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            <p className="text-sm line-clamp-1">{property.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center text-gray-600">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Square size={16} className="mr-1" />
              <span className="text-sm">{property.superArea} sq.ft</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t">
            <div>
              <p className="text-gray-500 text-sm">Rental Value</p>
              <p className="text-lg font-semibold text-blue-600">
                ₹{property.rentalValue.toLocaleString()}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-sm ${
              property.availability === 'Immediate'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {property.availability}
            </span>
          </div>
        </div>
      </Link>

      {showListOptions && lists.length > 0 && (
        <div className="px-4 pb-4">
          <div className="relative">
            <button
              onClick={() => setShowListMenu(!showListMenu)}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-200"
            >
              <Plus size={16} /> Add to List
            </button>
            
            {showListMenu && (
              <div className="absolute bottom-full left-0 w-full bg-white border rounded-lg shadow-lg mb-2 z-10">
                {lists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleAddToList(list.id)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {list.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}