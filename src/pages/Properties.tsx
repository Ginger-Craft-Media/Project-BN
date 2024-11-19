import { useState } from 'react';
import { usePropertyStore } from '../lib/store';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { Plus } from 'lucide-react';
import AddPropertyModal from '../components/AddPropertyModal';

export default function Properties() {
  const { properties } = usePropertyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    furnishing: [] as string[],
    availability: [] as string[],
  });

  const filteredProperties = properties.filter((property) => {
    return (
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1] &&
      (filters.furnishing.length === 0 ||
        filters.furnishing.includes(property.furnishingStatus)) &&
      (filters.availability.length === 0 ||
        filters.availability.includes(property.availability))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Properties</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <PropertyFilters filters={filters} onChange={setFilters} />
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No properties found matching your criteria.</h3>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddPropertyModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}