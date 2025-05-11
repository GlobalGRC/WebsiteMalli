import React from 'react';
import { Shield, Award, Users, Globe, Target, Briefcase, ArrowRight } from 'lucide-react';
import { MotionCard } from '../components/animations/MotionCard';
import { ParallaxSection } from '../components/animations/ParallaxSection';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Sarah Anderson',
      role: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      description: 'Former cybersecurity advisor to Fortune 500 companies with 20+ years of industry experience.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Leading expert in cloud security and compliance with multiple patents in security technology.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Compliance',
      image: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg',
      description: 'Certified compliance professional with expertise in GDPR, HIPAA, and ISO frameworks.'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-[#E60028]" />,
      title: 'Integrity',
      description: 'We maintain the highest standards of professional ethics and transparency.'
    },
    {
      icon: <Target className="h-8 w-8 text-[#E60028]" />,
      title: 'Excellence',
      description: 'We strive for excellence in every security solution we deliver.'
    },
    {
      icon: <Users className="h-8 w-8 text-[#E60028]" />,
      title: 'Collaboration',
      description: 'We work closely with clients to achieve their security goals.'
    },
    {
      icon: <Globe className="h-8 w-8 text-[#E60028]" />,
      title: 'Innovation',
      description: 'We stay ahead of emerging threats with innovative solutions.'
    }
  ];

  const businessLines = [
    {
      icon: <Target className="h-8 w-8 text-[#E60028]" />,
      title: 'GRC Solutions',
      description: 'Establish robust governance frameworks, manage risks effectively, and ensure regulatory compliance.'
    },
    {
      icon: <Shield className="h-8 w-8 text-[#E60028]" />,
      title: 'Cybersecurity',
      description: 'Advanced, proactive protection against evolving threats in an increasingly complex digital world.'
    },
    {
      icon: <Users className="h-8 w-8 text-[#E60028]" />,
      title: 'IT Assurance',
      description: 'Comprehensive services to ensure your systems and processes are secure, efficient, and reliable.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full max-w-[90rem] mx-auto mt-24">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          {/* Image Container */}
          <div className="relative h-[40vh] min-h-[400px]">
            <div className="absolute inset-0 bg-black/20" />
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
              alt="Team collaboration"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Content Container */}
            <div className="absolute inset-0">
              <div className="container mx-auto px-16 h-full flex flex-col justify-end pb-16">
                <div className="max-w-5xl">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-[#E60028] text-white text-sm font-medium rounded-full">
                      ABOUT US
                    </span>
                  </div>
                  
                  {/* Title and Description */}
                  <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">WHO WE ARE</h1>
                  <p className="text-lg text-white/90 max-w-3xl mb-6">
                    A team of dedicated cybersecurity experts committed to protecting organizations 
                    from evolving digital threats through innovative solutions and comprehensive strategies.
                  </p>
                  
                  {/* Action Button */}
                  <button className="bg-white text-[#E60028] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <MotionCard className="bg-gray-50 p-8 rounded-2xl">
              <div className="mb-6">
                <Briefcase className="h-12 w-12 text-[#E60028]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To empower organizations with cutting-edge cybersecurity solutions that protect 
                their digital assets, ensure compliance, and enable secure growth in an 
                increasingly connected world.
              </p>
            </MotionCard>
            <MotionCard className="bg-gray-50 p-8 rounded-2xl">
              <div className="mb-6">
                <Award className="h-12 w-12 text-[#E60028]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the global leader in innovative cybersecurity solutions, setting the 
                standard for excellence in digital protection and risk management across industries.
              </p>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <ParallaxSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <MotionCard key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Business Lines */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessLines.map((line, index) => (
              <MotionCard key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="mb-6">{line.icon}</div>
                <h3 className="text-xl font-bold mb-4">{line.title}</h3>
                <p className="text-gray-600">{line.description}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <MotionCard key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#E60028] font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#E60028] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg mb-8">Let's work together to secure your future and drive innovation.</p>
            <a 
              href="#contact" 
              className="inline-flex items-center bg-white text-[#E60028] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}; 