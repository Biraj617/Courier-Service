import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';

import UserDashboard from './pages/user/UserDashboard';
import CreateParcel from './pages/user/CreateParcel';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<div className="p-8 text-center text-xl">Contact Page (Coming Soon)</div>} />
          <Route path="/track/:trackingNumber" element={<div className="p-8 text-center text-xl">Tracking Page (Coming Soon)</div>} />
        </Route>

        {/* Auth Routes (No layout/Custom layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard/create" 
            element={isAuthenticated ? <CreateParcel /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard/history" 
            element={isAuthenticated ? <div className="p-8">History (Coming Soon)</div> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/admin" 
            element={isAuthenticated && user?.role === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/superadmin" 
            element={isAuthenticated && user?.role === 'SuperAdmin' ? <SuperAdminDashboard /> : <Navigate to="/login" />} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;