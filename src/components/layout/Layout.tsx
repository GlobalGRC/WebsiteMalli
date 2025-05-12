import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorEffect } from '../animations/CursorEffect';
import { MaintenancePage } from '../../App';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [maintenance, setMaintenance] = useState(false);
  useEffect(() => {
    function checkMaintenance() {
      setMaintenance(localStorage.getItem('siteMaintenance') === 'true');
    }
    checkMaintenance();
    window.addEventListener('storage', checkMaintenance);
    return () => window.removeEventListener('storage', checkMaintenance);
  }, []);

  useEffect(() => {
    function applyTheme() {
      const saved = localStorage.getItem('siteTheme');
      if (saved) {
        try {
          const theme = JSON.parse(saved);
          document.documentElement.style.setProperty('--primary-color', theme.primary || '#E60028');
          document.documentElement.style.setProperty('--background-color', theme.background || '#ffffff');
          document.documentElement.style.setProperty('--text-color', theme.text || '#000000');
        } catch {}
      }
    }
    applyTheme();
    window.addEventListener('storage', applyTheme);
    return () => window.removeEventListener('storage', applyTheme);
  }, []);

  if (maintenance && !window.location.pathname.startsWith('/admin')) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CursorEffect />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};