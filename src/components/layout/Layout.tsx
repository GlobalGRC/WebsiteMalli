import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorEffect } from '../animations/CursorEffect';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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