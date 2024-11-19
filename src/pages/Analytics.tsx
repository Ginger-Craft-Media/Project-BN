import { usePropertyStore } from '../lib/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Link, QrCode } from 'lucide-react';

export default function Analytics() {
  const { properties, trafficSources } = usePropertyStore();

  // Calculate total metrics
  const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
  const totalClicks = properties.reduce((sum, p) => sum + p.linkClicks, 0);
  const totalScans = properties.reduce((sum, p) => sum + p.qrCodeScans, 0);

  // Prepare property performance data
  const propertyData = properties.map(p => ({
    name: p.title,
    views: p.views,
    clicks: p.linkClicks,
    scans: p.qrCodeScans,
  }));

  // Prepare traffic source data
  const trafficData = trafficSources.reduce((acc, source) => {
    const existingData = acc.find(d => d.name === source.name);
    if (existingData) {
      existingData.visits += source.visits;
    } else {
      acc.push({ name: source.name, visits: source.visits });
    }
    return acc;
  }, [] as { name: string; visits: number }[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Views</h3>
            <Eye className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{totalViews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Link Clicks</h3>
            <Link className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">QR Scans</h3>
            <QrCode className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{totalScans}</p>
        </div>
      </div>

      {/* Property Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-6">Property Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={propertyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3B82F6" name="Views" />
              <Bar dataKey="clicks" fill="#10B981" name="Clicks" />
              <Bar dataKey="scans" fill="#8B5CF6" name="QR Scans" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Traffic Sources</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#3B82F6" name="Visits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}