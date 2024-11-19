import { useState } from 'react';
import { usePropertyStore } from '../lib/store';
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';

const STATUS_COLORS = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Scheduled: 'bg-purple-100 text-purple-800',
  Closed: 'bg-green-100 text-green-800',
} as const;

export default function Inquiries() {
  const { inquiries, properties, updateInquiryStatus } = usePropertyStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInquiries = inquiries.filter(
    inquiry => statusFilter === 'all' || inquiry.status === statusFilter
  );

  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.title || 'Unknown Property';
  };

  const handleStatusChange = (inquiryId: string, newStatus: 'New' | 'Contacted' | 'Scheduled' | 'Closed') => {
    updateInquiryStatus(inquiryId, newStatus);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customer Inquiries</h1>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{inquiry.name}</h2>
                <p className="text-gray-600 mb-2">
                  Interested in: {getPropertyTitle(inquiry.propertyId)}
                </p>
              </div>
              <select
                value={inquiry.status}
                onChange={(e) => handleStatusChange(inquiry.id, e.target.value as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  STATUS_COLORS[inquiry.status as keyof typeof STATUS_COLORS]
                }`}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2" />
                <span>{inquiry.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2" />
                <span>{inquiry.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <MessageSquare size={18} className="text-gray-400 mt-1" />
                <p className="text-gray-600">{inquiry.message}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl text-gray-600 mb-2">No inquiries found</h3>
            <p className="text-gray-500">
              {statusFilter === 'all'
                ? "You haven't received any inquiries yet"
                : `No inquiries with status "${statusFilter}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}