import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorEffect } from '../animations/CursorEffect';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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