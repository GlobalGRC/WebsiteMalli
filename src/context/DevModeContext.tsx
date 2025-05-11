import React, { createContext, useContext, useState } from 'react';

interface DevModeContextType {
  devMode: boolean;
  setDevMode: (on: boolean) => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devMode, setDevMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('devMode');
    return saved === 'true';
  });

  const setDevModeAndStore = (on: boolean) => {
    setDevMode(on);
    localStorage.setItem('devMode', on ? 'true' : 'false');
  };

  return (
    <DevModeContext.Provider value={{ devMode, setDevMode: setDevModeAndStore }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error('useDevMode must be used within DevModeProvider');
  return ctx;
}; 