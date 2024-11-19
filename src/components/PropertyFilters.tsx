import { useState } from 'react';
import { Filter } from 'lucide-react';

interface FilterProps {
  filters: {
    priceRange: [number, number];
    furnishing: string[];
    availability: string[];
  };
  onChange: (filters: {
    priceRange: [number, number];
    furnishing: string[];
    availability: string[];
  }) => void;
}

const FURNISHING_OPTIONS = [
  'Furnished',
  'Semi-Furnished',
  'Unfurnished',
];

const AVAILABILITY_OPTIONS = [
  'Immediate',
  'Within 15 Days',
  'Within 30 Days',
  'After 30 Days',
];

export default function PropertyFilters({ filters, onChange }: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    onChange({ ...filters, priceRange: newRange });
  };

  const toggleFurnishing = (value: string) => {
    const newFurnishing = filters.furnishing.includes(value)
      ? filters.furnishing.filter((f) => f !== value)
      : [...filters.furnishing, value];
    onChange({ ...filters, furnishing: newFurnishing });
  };

  const toggleAvailability = (value: string) => {
    const newAvailability = filters.availability.includes(value)
      ? filters.availability.filter((a) => a !== value)
      : [...filters.availability, value];
    onChange({ ...filters, availability: newAvailability });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between mb-4"
      >
        <span className="font-semibold">Filters</span>
        <Filter size={20} />
      </button>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block space-y-6`}>
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Min Price</label>
              <input
                type="range"
                min="0"
                max="1000000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm">₹{filters.priceRange[0].toLocaleString()}</span>
            </div>
            <div>
              <label className="text-sm text-gray-600">Max Price</label>
              <input
                type="range"
                min="0"
                max="1000000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm">₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Furnishing Status</h3>
          <div className="space-y-2">
            {FURNISHING_OPTIONS.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.furnishing.includes(option)}
                  onChange={() => toggleFurnishing(option)}
                  className="mr-2"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Availability</h3>
          <div className="space-y-2">
            {AVAILABILITY_OPTIONS.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(option)}
                  onChange={() => toggleAvailability(option)}
                  className="mr-2"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}