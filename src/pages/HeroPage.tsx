import React from 'react';

export const HeroPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white mt-24">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto pl-4 md:pl-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left">
              Welcome to <span className="text-[#E60028]">SCIA Global</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-left max-w-4xl">
              Your trusted partner in cybersecurity, compliance, and risk management solutions. We help organizations navigate the complex landscape of digital security and regulatory requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Mission</h2>
                <p className="text-gray-600 text-left">
                  To empower organizations with robust security solutions and expert guidance, ensuring their digital assets are protected and their operations remain compliant with industry standards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Vision</h2>
                <p className="text-gray-600 text-left">
                  To be the global leader in cybersecurity and compliance solutions, setting new standards for excellence and innovation in protecting digital infrastructure.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Values</h2>
                <p className="text-gray-600 text-left">
                  Integrity, innovation, and excellence drive everything we do. We are committed to delivering exceptional service and building lasting partnerships with our clients.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-left">Why Choose Us?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Industry-leading expertise and experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Comprehensive security and compliance solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Proactive approach to risk management</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-left">Our Services</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Cybersecurity consulting and implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Compliance and regulatory support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-left">Professional training and certification programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto pl-4 md:pl-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left">
              Who <span className="text-[#E60028]">We Are</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-xl text-gray-600 mb-8 text-left">
                  We are a team of dedicated experts providing top-tier IT Assurance, Cybersecurity, and GRC solutions.
                </p>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Mission</h3>
                    <p className="text-gray-600 text-left">
                      Our mission is to empower businesses by delivering comprehensive security, governance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Approach</h3>
                    <p className="text-gray-600 text-left">
                      We take a proactive, tailored approach to address the unique needs of each client.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E60028]">Our Expertise</h3>
                    <p className="text-gray-600 text-left">
                      We specialize in IT Assurance, Cybersecurity, and GRC.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#E60028]">Why Choose Us</h3>
                    <p className="text-gray-600 text-left">
                      We combine expertise, reliability, and a client-focused mindset to offer solutions that protect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}; 