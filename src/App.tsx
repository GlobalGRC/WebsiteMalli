import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { HeroPage } from './pages/HeroPage';
import { AdminPanel } from './pages/AdminPanel';
import { AdminLogin } from './pages/AdminLogin';
import { AdminProvider } from './context/AdminContext';
import { BlogPage } from './pages/BlogPage';
import { DevModeProvider } from './context/DevModeContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userData = localStorage.getItem('adminUser');
  if (!userData) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-[#E60028]">Site Under Maintenance</h1>
      <p className="text-lg text-gray-700 mb-8">We are currently performing scheduled maintenance. Please check back soon.</p>
    </div>
  );
}

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [featureToggles, setFeatureToggles] = useState({
    blog: true,
    testimonials: true,
    jobs: true,
    adminPanel: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('siteMaintenance');
    setMaintenance(saved === 'true');
    const toggles = localStorage.getItem('featureToggles');
    if (toggles) {
      try {
        setFeatureToggles({ ...featureToggles, ...JSON.parse(toggles) });
      } catch {}
    }
    function handleStorage() {
      const saved = localStorage.getItem('siteMaintenance');
      setMaintenance(saved === 'true');
      const toggles = localStorage.getItem('featureToggles');
      if (toggles) {
        try {
          setFeatureToggles({ ...featureToggles, ...JSON.parse(toggles) });
        } catch {}
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line
  }, []);

  // Show maintenance page for all except admin login and admin panel
  if (maintenance && !window.location.pathname.startsWith('/admin')) {
    return <MaintenancePage />;
  }

  return (
    <DevModeProvider>
    <AdminProvider>
    <Router>
      <Layout>
        <Routes>
            {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
            <Route path="/hero" element={<HeroPage />} />
          <Route path="/courses" element={<CoursesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          {featureToggles.blog && <Route path="/blog" element={<BlogPage />} />}

            {/* Protected Admin Routes */}
          {featureToggles.adminPanel && (
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          )}

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
    </AdminProvider>
    </DevModeProvider>
  );
}

export default App;