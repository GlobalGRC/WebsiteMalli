import React from 'react';
import { Shield, FileText, BookOpen } from 'lucide-react';
import { MotionCard } from '../animations/MotionCard';
import { ParallaxSection } from '../animations/ParallaxSection';

export const InsightsSection: React.FC = () => {
  const insights = [
    {
      icon: <Shield className="h-12 w-12 text-[#E60028]" />,
      title: 'Cybersecurity in Financial Services',
      description: 'Best practices for protecting financial data and ensuring compliance with industry regulations.',
      category: 'Cybersecurity',
      date: 'March 15, 2024',
      readTime: '5 min read'
    },
    {
      icon: <FileText className="h-12 w-12 text-[#E60028]" />,
      title: 'Healthcare Compliance Updates',
      description: 'Latest changes in healthcare regulations and how to maintain compliance in 2024.',
      category: 'Compliance',
      date: 'March 10, 2024',
      readTime: '4 min read'
    },
    {
      icon: <BookOpen className="h-12 w-12 text-[#E60028]" />,
      title: 'Risk Management Strategies',
      description: 'Effective approaches to identifying and mitigating cybersecurity risks in your organization.',
      category: 'Risk Management',
      date: 'March 5, 2024',
      readTime: '6 min read'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-[#E60028]">Insights</span>
          </h2>
          <p className="text-lg text-gray-600">
            Stay informed with our latest articles, guides, and resources on cybersecurity, compliance, and risk management.
            </p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <ParallaxSection key={index} speed={0.05}>
              <MotionCard depth={10}>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#E60028] transition-colors">
                  <div className="mb-6">
                    {insight.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-rose-50 text-[#E60028] rounded-full text-sm font-medium">
                      {insight.category}
                    </span>
                    <span className="text-gray-400 text-sm">{insight.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                  <p className="text-gray-600 mb-6">{insight.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{insight.readTime}</span>
          </div>
        </div>
            </MotionCard>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
};