import React from 'react';
import { Shield, FileCheck, AlertTriangle, CreditCard, Server, Lock } from 'lucide-react';
import { MotionCard } from '../components/animations/MotionCard';
import { ParallaxSection } from '../components/animations/ParallaxSection';

export const CoursesPage: React.FC = () => {
  const courses = [
    {
      icon: <FileCheck className="h-12 w-12 text-[#E60028]" />,
      title: 'SOX (Sarbanes-Oxley Act) Training',
      duration: '4 weeks',
      overview: 'Gain a deep understanding of the Sarbanes-Oxley Act, focusing on internal controls, financial reporting, and corporate governance. Learn about IT General Controls (ITGC), IT Application Controls (ITAC), and Information Produced by the Entity (IPE) essential for SOX compliance.',
      keyTopics: [
        'Internal controls and financial reporting',
        'Corporate governance requirements',
        'IT General Controls (ITGC)',
        'IT Application Controls (ITAC)',
        'Information Produced by the Entity (IPE)'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <Shield className="h-12 w-12 text-[#E60028]" />,
      title: 'HITRUST Training',
      duration: '5 weeks',
      overview: 'Master HITRUST CSF (Common Security Framework) and learn how to assess compliance and mitigate risks in industries like healthcare and finance. This course covers HITRUST e1, i1, and r2 assessments, enabling participants to navigate the complex regulatory environment.',
      keyTopics: [
        'HITRUST CSF framework',
        'Compliance assessment',
        'Risk mitigation strategies',
        'HITRUST e1, i1, and r2 assessments',
        'Regulatory requirements'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    },
    {
      icon: <Server className="h-12 w-12 text-[#E60028]" />,
      title: 'SOC 1 & SOC 2 Training',
      duration: '4 weeks',
      overview: 'This course covers SOC 1 (Financial Reporting Controls) and SOC 2 (Security, Availability, Processing Integrity, Confidentiality, and Privacy). Understand the audit frameworks and how they apply to sensitive data and risk management in cloud computing, healthcare, and SaaS environments.',
      keyTopics: [
        'SOC 1 financial reporting controls',
        'SOC 2 security principles',
        'Audit frameworks',
        'Cloud computing compliance',
        'Data privacy requirements'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <CreditCard className="h-12 w-12 text-[#E60028]" />,
      title: 'PCI DSS Training',
      duration: '4 weeks',
      overview: 'Understand the importance of PCI DSS compliance and how to secure cardholder data across organizations. Learn the standards required to protect payment card information and reduce fraud risks.',
      keyTopics: [
        'PCI DSS requirements',
        'Cardholder data security',
        'Payment processing security',
        'Fraud prevention',
        'Compliance assessment'
      ],
      color: 'from-gray-50 to-white',
      borderColor: 'border-gray-100'
    },
    {
      icon: <Lock className="h-12 w-12 text-[#E60028]" />,
      title: 'ISO 27001 – ISMS Training',
      duration: '6 weeks',
      overview: 'Learn how to implement an Information Security Management System (ISMS) in line with ISO 27001. This course provides the tools to design, manage, and audit an ISMS to ensure your organization\'s data security and regulatory compliance.',
      keyTopics: [
        'ISMS implementation',
        'ISO 27001 requirements',
        'Security controls',
        'Risk assessment',
        'Compliance auditing'
      ],
      color: 'from-rose-50 to-white',
      borderColor: 'border-rose-100'
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-[#E60028]" />,
      title: 'ISO 31000 – Risk Management Framework Training',
      duration: '5 weeks',
      overview: 'Develop a robust risk management framework by studying ISO 31000. This course covers strategies to identify, assess, and mitigate risks, ensuring that businesses can handle uncertainties effectively and stay compliant with industry standards.',
      keyTopics: [
        'Risk management principles',
        'Risk assessment methodologies',
        'Risk treatment strategies',
        'Compliance frameworks',
        'Business continuity planning'
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
              Our <span className="text-[#E60028]">Professional Training Courses</span>
          </h1>
            <p className="text-lg text-gray-600 mb-6 text-left max-w-4xl">
              Comprehensive training programs designed to enhance your professional skills in compliance, security, and risk management. Our expert-led courses provide practical knowledge and industry-recognized certifications.
          </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Course Features</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Expert instructors with industry experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Hands-on practical exercises and case studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Flexible learning options and schedules</span>
                  </li>
                </ul>
                </div>
                <div>
                <h2 className="text-2xl font-semibold mb-4">Learning Outcomes</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Practical skills for immediate application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Networking opportunities with industry peers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <ParallaxSection key={index} speed={0.05}>
                <MotionCard depth={10}>
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                    <div className="mb-6">
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        Duration: {course.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{course.overview}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Topics:</h4>
                      <ul className="space-y-2">
                        {course.keyTopics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start">
                            <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className="inline-block text-[#E60028] font-medium hover:text-[#c4001f] transition-colors"
                    >
                      Learn More →
                    </a>
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
              Ready to Advance Your Career?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our professional training courses and gain the expertise needed to excel in compliance, security, and risk management.
            </p>
            <a
              href="#contact"
              className="inline-block bg-[#E60028] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c4001f] transition-colors"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};