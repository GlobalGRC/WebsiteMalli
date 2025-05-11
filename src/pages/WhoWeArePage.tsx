import React from 'react';
import { Shield, Award, Users, Globe, Target, Briefcase } from 'lucide-react';
import { ParallaxSection } from '../components/animations/ParallaxSection';
import { MotionCard } from '../components/animations/MotionCard';

export const WhoWeArePage: React.FC = () => {
  const team = [
    {
      name: 'Sarah Anderson',
      role: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Former cybersecurity advisor to Fortune 500 companies with 20+ years of industry experience.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Leading expert in cloud security and compliance with multiple patents in security technology.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Compliance',
      image: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            A team of dedicated cybersecurity experts committed to protecting organizations 
            from evolving digital threats through innovative solutions and comprehensive strategies.
          </p>
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

      {/* Leadership Team */}
      <section className="py-20 bg-white">
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
    </div>
  );
};