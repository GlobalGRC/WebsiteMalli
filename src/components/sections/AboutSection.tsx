import React from 'react';
import { Award, Users, Shield, Zap } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { ParallaxSection } from '../animations/ParallaxSection';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#E60028] opacity-10 rounded-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E60028] opacity-10 rounded-lg"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Security professionals" 
                className="w-full h-auto object-cover rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team meeting" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Security analysis" 
                className="w-full h-auto object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About SCIAGlobal</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2000, SCIAGlobal has established itself as a global leader in providing innovative technology solutions and digital transformation services to organizations worldwide.
            </p>
            <p className="text-gray-600 mb-8">
              Our team of technology experts brings decades of experience across various industries, enabling us to deliver cutting-edge solutions that drive business growth and innovation. We believe in a collaborative approach, working closely with our clients to understand their unique challenges and opportunities.
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-[#E60028] mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Expert Team</h3>
                  <p className="text-sm text-gray-600">Certified technology professionals and industry experts</p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-[#E60028] mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Innovation</h3>
                  <p className="text-sm text-gray-600">Cutting-edge solutions and emerging technologies</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="h-6 w-6 text-[#E60028] mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Industry Recognition</h3>
                  <p className="text-sm text-gray-600">Award-winning technology solutions provider</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 text-[#E60028] mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Global Presence</h3>
                  <p className="text-sm text-gray-600">Serving clients across 25+ countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ParallaxSection className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              number="1000+"
              label="Global Clients"
              description="Organizations transformed through our solutions"
            />
            <StatCard 
              number="25+"
              label="Countries"
              description="Where we deliver our technology services"
            />
            <StatCard 
              number="20+"
              label="Years Experience"
              description="Of delivering innovative technology solutions"
            />
            <StatCard 
              number="500+"
              label="Technology Experts"
              description="Dedicated to driving digital transformation"
            />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};