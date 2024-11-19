import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Analytics from './pages/Analytics';
import Inquiries from './pages/Inquiries';
import TrackingPage from './pages/TrackingPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inquiries" element={<Inquiries />} />
        </Route>
        
        {/* Public tracking route without Layout */}
        <Route path="track/:listId" element={<TrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;