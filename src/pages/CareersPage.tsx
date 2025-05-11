import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { MotionCard } from '../components/animations/MotionCard';
import { ParallaxSection } from '../components/animations/ParallaxSection';
import { JobApplicationForm } from '../components/forms/JobApplicationForm';
import { useAdmin } from '../context/AdminContext';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({ position: '' });
  const { jobs } = useAdmin();

  // Filter only open jobs
  const openJobs = jobs.filter(job => job.status === 'open');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
              Join Our <span className="text-[#E60028]">Team</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 text-left max-w-4xl">
              Be part of a dynamic team that's shaping the future of cybersecurity and compliance. We're looking for passionate professionals who want to make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Competitive compensation and benefits package</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Flexible work arrangements and remote options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Continuous learning and professional development</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Culture</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Collaborative and innovative work environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Diverse and inclusive workplace</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[#E60028] text-white rounded-full h-5 w-5 min-w-5 text-xs mr-3 mt-0.5">✓</span>
                    <span>Work-life balance and wellness programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ParallaxSection speed={0.05}>
              <MotionCard depth={10}>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Briefcase className="h-12 w-12 text-[#E60028] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Professional Growth</h3>
                  <p className="text-gray-600">Continuous learning opportunities and career development programs</p>
                </div>
              </MotionCard>
            </ParallaxSection>
            <ParallaxSection speed={0.05}>
              <MotionCard depth={10}>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-[#E60028] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Flexible Work</h3>
                  <p className="text-gray-600">Remote and hybrid work options to suit your lifestyle</p>
                </div>
              </MotionCard>
            </ParallaxSection>
            <ParallaxSection speed={0.05}>
              <MotionCard depth={10}>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Clock className="h-12 w-12 text-[#E60028] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
                  <p className="text-gray-600">Competitive benefits and a supportive work environment</p>
                </div>
              </MotionCard>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
          <div className="grid grid-cols-1 gap-8">
            {openJobs.map((job) => (
              <ParallaxSection key={job.id} speed={0.05}>
                <MotionCard depth={10}>
                  <div 
                    className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all duration-300 ${
                      selectedJob === job.id ? 'border-2 border-[#E60028]' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.department}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`h-6 w-6 text-[#E60028] transition-transform duration-300 ${
                        selectedJob === job.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                    
                    {selectedJob === job.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-600 mb-6">{job.description}</p>
                        <h4 className="font-bold mb-4">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-[#E60028] mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <button 
                            onClick={() => {
                              setShowApplicationForm(true);
                              setFormData(prev => ({ ...prev, position: job.title }));
                            }}
                            className="inline-flex items-center bg-[#E60028] text-white px-6 py-3 rounded-full font-medium hover:bg-[#c4001f] transition-colors duration-300"
                          >
                            Apply Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </MotionCard>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Role?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="inline-flex items-center bg-[#E60028] text-white px-8 py-3 rounded-full font-medium hover:bg-[#c4001f] transition-colors duration-300"
            >
              Submit Your Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {showApplicationForm && (
        <JobApplicationForm 
          onClose={() => setShowApplicationForm(false)} 
          initialPosition={formData.position}
        />
      )}
    </div>
  );
}; 