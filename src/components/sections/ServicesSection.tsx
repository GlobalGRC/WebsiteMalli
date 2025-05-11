import React from 'react';
import { Shield, FileCheck, AlertTriangle } from 'lucide-react';
import { MotionCard } from '../animations/MotionCard';
import { ParallaxSection } from '../animations/ParallaxSection';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Shield className="h-12 w-12 text-[#E60028]" />,
      title: 'Cybersecurity Services',
      description: 'Comprehensive cybersecurity solutions to protect your digital assets and ensure business continuity.',
      features: [
        'Security Assessment & Testing',
        'Vulnerability Management',
        'Incident Response',
        'Security Awareness Training',
        'Threat Intelligence'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <FileCheck className="h-12 w-12 text-[#E60028]" />,
      title: 'Compliance & Audit',
      description: 'Expert compliance and audit services to ensure your organization meets regulatory requirements.',
      features: [
        'SOX Compliance',
        'SOC 1 & SOC 2 Audits',
        'PCI DSS Assessment',
        'ISO 27001 Certification',
        'HITRUST CSF'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-[#E60028]" />,
      title: 'Risk Management',
      description: 'Strategic risk management solutions to identify, assess, and mitigate potential threats.',
      features: [
        'Risk Assessment',
        'Business Continuity Planning',
        'Third-Party Risk Management',
        'Compliance Risk Management',
        'Operational Risk Analysis'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100' 
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#E60028]">Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive solutions to protect your business, ensure compliance, and manage risks effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ParallaxSection key={index} speed={0.05}>
              <MotionCard depth={10}>
                <div className={`bg-gradient-to-b ${service.color} rounded-xl shadow-lg p-8 border ${service.borderColor}`}>
                  <div className="mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-[#E60028] mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionCard>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
};