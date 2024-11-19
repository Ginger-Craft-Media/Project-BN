import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { usePropertyStore } from '../lib/store';

interface PropertyFormProps {
  listId: string;
  onClose: () => void;
}

export default function PropertyForm({ listId, onClose }: PropertyFormProps) {
  const { addPropertyToList } = usePropertyStore();
  const [formData, setFormData] = useState({
    title: '',
    developer: '',
    price: '',
    rentalValue: '',
    securityDeposit: '',
    furnishingStatus: 'Furnished' as const,
    superArea: '',
    availability: 'Immediate' as const,
    floorNumber: '',
    totalFloors: '',
    bathrooms: '',
    constructionAge: '',
    address: '',
    description: '',
    landmarks: '',
    overlooking: '',
    amenities: '',
    tenantPreferences: '',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPropertyToList(listId, {
      ...formData,
      id: '',
      price: Number(formData.price),
      rentalValue: Number(formData.rentalValue),
      securityDeposit: Number(formData.securityDeposit),
      superArea: Number(formData.superArea),
      floorNumber: Number(formData.floorNumber),
      totalFloors: Number(formData.totalFloors),
      bathrooms: Number(formData.bathrooms),
      constructionAge: Number(formData.constructionAge),
      landmarks: formData.landmarks.split(',').map((s) => s.trim()),
      overlooking: formData.overlooking.split(',').map((s) => s.trim()),
      amenities: formData.amenities.split(',').map((s) => s.trim()),
      tenantPreferences: formData.tenantPreferences.split(',').map((s) => s.trim()),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      views: 0,
      qrCodeScans: 0,
      linkClicks: 0,
    });
    onClose();
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Property to List</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Developer*
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rental Value*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.rentalValue}
                onChange={(e) => setFormData({ ...formData, rentalValue: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Security Deposit*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Super Area (sq.ft)*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.superArea}
                onChange={(e) => setFormData({ ...formData, superArea: e.target.value })}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor Number*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.floorNumber}
                onChange={(e) => setFormData({ ...formData, floorNumber: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Floors*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.totalFloors}
                onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Furnishing Status*
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.furnishingStatus}
                onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value as any })}
              >
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability*
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
              >
                <option value="Immediate">Immediate</option>
                <option value="Within 15 Days">Within 15 Days</option>
                <option value="Within 30 Days">Within 30 Days</option>
                <option value="After 30 Days">After 30 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Construction Age (years)*
              </label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.constructionAge}
                onChange={(e) => setFormData({ ...formData, constructionAge: e.target.value })}
              />
            </div>
          </div>

          {/* Location and Description */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <textarea
                required
                rows={2}
                className="w-full px-3 py-2 border rounded-md"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmarks (comma-separated)*
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Shopping Mall, Metro Station, Hospital"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.landmarks}
                onChange={(e) => setFormData({ ...formData, landmarks: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overlooking (comma-separated)*
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Garden, Pool, Main Road"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.overlooking}
                onChange={(e) => setFormData({ ...formData, overlooking: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amenities (comma-separated)*
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Swimming Pool, Gym, Security"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenant Preferences (comma-separated)*
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Family, Working Professionals, Students"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.tenantPreferences}
                onChange={(e) => setFormData({ ...formData, tenantPreferences: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageAdd}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to List
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}