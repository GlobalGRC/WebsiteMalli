import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { InsightsSection } from '../components/sections/InsightsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { YouTubeVideosSection } from '../components/sections/YouTubeVideosSection';
import { LinkedInPostsSection } from '../components/sections/LinkedInPostsSection';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* Who We Are Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto pl-4 md:pl-6">
            <div className="flex items-center mb-12">
              <div className="h-1 w-16 bg-[#E60028] mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-left">
                Who <span className="text-[#E60028]">We Are</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-[#E60028] flex items-center">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-8 w-8 mr-3">1</span>
                    Our Mission
                  </h3>
                  <p className="text-gray-600 text-left text-lg">
                    Our mission is to empower businesses by delivering comprehensive security, governance, and risk management solutions that drive growth and ensure compliance.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-[#E60028] flex items-center">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-8 w-8 mr-3">2</span>
                    Our Approach
                  </h3>
                  <p className="text-gray-600 text-left text-lg">
                    We take a proactive, tailored approach to address the unique needs of each client, combining cutting-edge technology with industry expertise.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-[#E60028] flex items-center">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-8 w-8 mr-3">3</span>
                    Our Expertise
                  </h3>
                  <p className="text-gray-600 text-left text-lg">
                    We specialize in IT Assurance, Cybersecurity, and GRC, with a team of certified professionals dedicated to delivering excellence.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-[#E60028] flex items-center">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-8 w-8 mr-3">4</span>
                    Why Choose Us
                  </h3>
                  <p className="text-gray-600 text-left text-lg">
                    We combine expertise, reliability, and a client-focused mindset to offer solutions that protect your business and drive success.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16 bg-[#E60028] p-8 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Your Trusted Partner in IT Security and Compliance</h3>
              <p className="text-lg">
                We are a team of dedicated experts providing top-tier IT Assurance, Cybersecurity, and GRC solutions. Our commitment to excellence and innovation sets us apart in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <SolutionsSection />
      <AboutSection />
      <TestimonialsSection />
      <YouTubeVideosSection />
      <LinkedInPostsSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
};