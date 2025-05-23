import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from '../../utils/Link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [branding, setBranding] = useState({ siteName: 'SCIA GLOBAL' });
  useEffect(() => {
    const saved = localStorage.getItem('siteBranding');
    if (saved) {
      try {
        setBranding({ ...branding, ...JSON.parse(saved) });
      } catch {}
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="font-bold text-2xl">{branding.siteName}</span>
            </div>
            <p className="text-gray-400 mb-4">
              Leading the way in IT compliance, cybersecurity, and risk management solutions.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Linkedin size={20} />} href="#" />
              <SocialLink icon={<Twitter size={20} />} href="#" />
              <SocialLink icon={<Facebook size={20} />} href="#" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#" label="Cybersecurity Assessment" />
              <FooterLink href="#" label="Risk Management" />
              <FooterLink href="#" label="Compliance Solutions" />
              <FooterLink href="#" label="Security Advisory" />
              <FooterLink href="#" label="Incident Response" />
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#about" label="About Us" />
              <FooterLink href="#" label="Our Team" />
              <FooterLink href="#" label="Careers" />
              <FooterLink href="#insights" label="Blog & Insights" />
              <FooterLink href="#" label="Privacy Policy" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#E60028] mr-2 mt-0.5" />
                <span className="text-gray-400">Block A, 3rd Floor Victory Plaza, Brindavan Colony Road, Street Number 1, Sabza Colony, Toli Chowki, Hyderabad, Telangana 500008</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#E60028] mr-2" />
                <span className="text-gray-400">+91 8309943648</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#E60028] mr-2" />
                <span className="text-gray-400">mallikarjuna@sciaglobal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {branding.siteName}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-white transition-colors duration-300"
      >
        {label}
      </Link>
    </li>
  );
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <Link 
      href={href} 
      className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E60028] transition-colors duration-300"
    >
      {icon}
    </Link>
  );
};