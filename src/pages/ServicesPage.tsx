import React from 'react';
import { Shield, FileCheck, AlertTriangle, Users } from 'lucide-react';
import { MotionCard } from '../components/animations/MotionCard';
import { ParallaxSection } from '../components/animations/ParallaxSection';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Shield className="h-12 w-12 text-[#E60028]" />,
      title: 'Cybersecurity',
      description: 'Comprehensive cybersecurity solutions to protect your digital assets and ensure business continuity.',
      features: [
        'Network security assessment',
        'Vulnerability management',
        'Incident response planning',
        'Security awareness training',
        'Threat intelligence'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <FileCheck className="h-12 w-12 text-[#E60028]" />,
      title: 'Audit & Assurance',
      description: 'Independent and objective assurance services to enhance the reliability of your information systems.',
      features: [
        'IT audit services',
        'Compliance assessment',
        'Control testing',
        'Process improvement',
        'Regulatory reporting'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-[#E60028]" />,
      title: 'Risk Advisory',
      description: 'Strategic risk management solutions to identify, assess, and mitigate potential threats to your organization.',
      features: [
        'Risk assessment',
        'Business continuity planning',
        'Third-party risk management',
        'Compliance risk management',
        'Operational risk analysis'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <Users className="h-12 w-12 text-[#E60028]" />,
      title: 'Co-sourcing',
      description: 'Flexible and scalable co-sourcing solutions to enhance your internal capabilities and optimize operations.',
      features: [
        'Managed security services',
        'Compliance management',
        'Risk monitoring',
        'Process optimization',
        'Resource augmentation'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
              Our <span className="text-[#E60028]">Professional Services</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 text-left max-w-4xl">
              Comprehensive security, audit, and risk management solutions designed to protect and enhance your business operations. Our expert team delivers tailored services to meet your specific needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Customized solutions for your unique challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Industry-leading expertise and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Proactive risk management and compliance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Enhanced security and risk mitigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Regulatory compliance and audit readiness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Improved operational efficiency and performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ParallaxSection key={index} speed={0.05}>
                <MotionCard depth={10}>
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                    <div className="mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how our professional services can help you protect your assets and achieve your business objectives.
            </p>
            <a
              href="#contact"
              className="inline-block bg-[#E60028] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c4001f] transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}; 