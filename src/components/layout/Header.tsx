import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';


export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsDev] = useState(false);
  const [branding, setBranding] = useState({ siteName: 'SCIA GLOBAL', logoUrl: '/assets/sciaglobal.png', faviconUrl: '' });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setIsDev(parsed.role === 'dev');
      } catch {}
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('siteBranding');
    if (saved) {
      try {
        setBranding({ ...branding, ...JSON.parse(saved) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (branding.faviconUrl) {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  }, [branding.faviconUrl]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white text-gray-900 shadow-lg py-2' 
          : 'bg-white text-gray-900 py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between max-w-7xl">
        {/* Logo - Left */}
        <div className="flex-shrink-0 mr-8">
          <RouterLink to="/" className="flex items-center">
            <img
              src={branding.logoUrl || '/assets/sciaglobal.png'}
              alt={branding.siteName || 'Logo'}
              className="h-16 w-auto"
            />
          </RouterLink>
        </div>
        
        {/* Desktop Navigation - Middle */}
        <div className="hidden md:flex flex-col items-center justify-center flex-grow">
          <motion.div 
            className="text-sm font-bold text-[#E60028] mb-4 tracking-wider uppercase italic px-16 w-full text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(230, 0, 40, 0.3)" }}
          >
            Together We Achieve More
          </motion.div>
          <nav className="flex items-center justify-center space-x-10">
            <RouterLink 
              to="/about" 
              className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            >
              <span className="font-bold text-2xl">{branding.siteName}</span>
            </RouterLink>
            <RouterLink 
              to="/services" 
              className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            >
              SERVICES
            </RouterLink>
            <RouterLink 
              to="/careers" 
              className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            >
              CARRERS
            </RouterLink>
            <RouterLink 
              to="/courses" 
              className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            >
              SCIA ACADEMY
            </RouterLink>
            <RouterLink 
              to="/blog" 
              className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            >
              BLOG
            </RouterLink>
          </nav>
        </div>
        
        {/* Connect with us button - Right */}
        <div className="hidden md:flex items-center flex-shrink-0 ml-8 gap-4">
          <NavItem href="#contact" label="Connect with us" isButton={true} />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-3xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 w-full bg-white text-gray-900 shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
          <RouterLink 
            to="/about" 
            className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            onClick={toggleMenu}
          >
            <span className="font-bold text-2xl">{branding.siteName}</span>
          </RouterLink>
          <RouterLink 
            to="/services" 
            className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            onClick={toggleMenu}
          >
            SERVICES
          </RouterLink>
          <RouterLink 
            to="/courses" 
            className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            onClick={toggleMenu}
          >
            SCIA ACADEMY
          </RouterLink>
          <RouterLink 
            to="/careers" 
            className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            onClick={toggleMenu}
          >
            CARRERS
          </RouterLink>
          <RouterLink 
            to="/blog" 
            className="text-md font-medium hover:text-[#E60028] transition-colors duration-300"
            onClick={toggleMenu}
          >
            BLOG
          </RouterLink>
          <MobileNavItem 
            href="#contact" 
            label="Connect with us" 
            onClick={toggleMenu} 
            isButton={true} 
          />
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  isButton?: boolean;
  className?: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, label, isButton = false, className }) => {
  return (
    <a
      href={href}
      className={`text-md font-medium hover:text-[#E60028] transition-colors duration-300 ${isButton ? 'bg-[#E60028] text-white px-6 py-3 rounded-lg' : ''} ${className || ''}`}
    >
      {label}
    </a>
  );
};

interface MobileNavItemProps {
  href: string;
  label: string;
  onClick: () => void;
  isButton?: boolean;
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, label, onClick, isButton = false }) => {
  return (
    <a
      href={href}
      className={`text-md font-medium hover:text-[#E60028] transition-colors duration-300 ${isButton ? 'bg-[#E60028] text-white px-6 py-3 rounded-lg w-full text-center' : ''}`}
      onClick={onClick}
    >
      {label}
    </a>
  );
};