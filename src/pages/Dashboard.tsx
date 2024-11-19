import { useState } from 'react';
import { Plus, Share2, Home, Copy, Check, QrCode } from 'lucide-react';
import { usePropertyStore } from '../lib/store';
import PropertyForm from '../components/PropertyForm';
import PropertyCard from '../components/PropertyCard';
import { QRCodeSVG } from 'qrcode.react';

export default function Dashboard() {
  const { lists, properties, createList } = usePropertyStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<string | null>(null);

  const handleCreateList = () => {
    const name = prompt('Enter list name:');
    if (name) {
      createList(name);
    }
  };

  const copyTrackingLink = (listId: string) => {
    const link = `${window.location.origin}/track/${listId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(listId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Property Dashboard</h1>
        <button
          onClick={handleCreateList}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={20} /> Create List
        </button>
      </div>

      {lists.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl text-gray-600 mb-4">No property lists yet</h3>
          <p className="text-gray-500 mb-6">Create your first property list to get started</p>
          <button
            onClick={handleCreateList}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 mx-auto"
          >
            <Plus size={20} /> Create List
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {lists.map((list) => {
            const uniqueProperties = Array.from(
              new Map(list.properties.map(prop => [prop.id, prop])).values()
            );

            return (
              <div key={list.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{list.name}</h2>
                  <div className="flex gap-4 items-center">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={`${window.location.origin}/track/${list.id}`}
                        readOnly
                        className="bg-gray-50 px-4 py-2 rounded-lg pr-24 w-64"
                      />
                      <button
                        onClick={() => copyTrackingLink(list.id)}
                        className="absolute right-2 text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        {copiedId === list.id ? (
                          <>
                            <Check size={16} />
                            <span className="text-sm">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span className="text-sm">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => setShowQR(showQR === list.id ? null : list.id)}
                      className="text-gray-600 hover:text-blue-500"
                      title="Show QR Code"
                    >
                      <QrCode size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedList(list.id);
                        setShowForm(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-blue-600 text-sm"
                    >
                      <Plus size={16} /> Add Property
                    </button>
                  </div>
                </div>

                {showQR === list.id && (
                  <div className="mb-6 flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <QRCodeSVG
                        value={`${window.location.origin}/track/${list.id}`}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                      <p className="text-center mt-2 text-sm text-gray-600">
                        Scan to view properties
                      </p>
                    </div>
                  </div>
                )}
                
                {uniqueProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uniqueProperties.map((property) => (
                      <PropertyCard 
                        key={`${list.id}-${property.id}`}
                        property={property}
                        showListOptions={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Home size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">No properties in this list yet</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showForm && selectedList && (
        <PropertyForm
          listId={selectedList}
          onClose={() => {
            setShowForm(false);
            setSelectedList(null);
          }}
        />
      )}
    </div>
  );
}