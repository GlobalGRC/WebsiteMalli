import React from 'react';
import { Building2, Stethoscope, Factory } from 'lucide-react';
import { MotionCard } from '../animations/MotionCard';
import { ParallaxSection } from '../animations/ParallaxSection';

export const SolutionsSection: React.FC = () => {
  const solutions = [
    {
      icon: <Building2 className="h-12 w-12 text-[#E60028]" />,
      title: 'Financial Services',
      description: 'Specialized solutions for financial institutions to meet regulatory requirements and protect sensitive data.',
      features: [
        'SOX Compliance',
        'GLBA Compliance',
        'FFIEC Guidelines',
        'Payment Security',
        'Fraud Prevention'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-[#E60028]" />,
      title: 'Healthcare',
      description: 'Comprehensive compliance and security solutions for healthcare organizations.',
      features: [
        'HIPAA Compliance',
        'HITRUST Certification',
        'PHI Protection',
        'Medical Device Security',
        'Healthcare Data Privacy'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    },
    {
      icon: <Factory className="h-12 w-12 text-[#E60028]" />,
      title: 'Manufacturing',
      description: 'Industrial cybersecurity and compliance solutions for manufacturing organizations.',
      features: [
        'OT Security',
        'Supply Chain Security',
        'ISO 27001 Implementation',
        'Data Protection',
        'Compliance Management'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industry-Specific <span className="text-[#E60028]">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Tailored solutions designed to address the unique challenges and compliance requirements of your industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <ParallaxSection key={index} speed={0.05}>
              <MotionCard depth={10}>
                <div className={`bg-gradient-to-b ${solution.color} rounded-xl shadow-lg p-8 border ${solution.borderColor}`}>
                  <div className="mb-6">
                    {solution.icon}
        </div>
                  <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
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