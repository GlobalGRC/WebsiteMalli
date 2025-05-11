import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxSection } from '../sections/ParallaxSection';

export const LinkedInPostsSection: React.FC = () => {
  return (
    <ParallaxSection className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Updates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow our LinkedIn page for the latest news, insights, and updates about cybersecurity, compliance, and risk management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Post 1 */}
          <div className="linkedin-post bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <a href="https://www.linkedin.com/posts/scia-global_itgc-accessmanagement-sciawebinar-activity-7319964408875544577-_Nxr" target="_blank" rel="noopener noreferrer" className="block">

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">ITGC & Access Management - SCIA Webinar</h3>
                <p className="text-gray-600 mb-4">Join us for an insightful webinar on ITGC and Access Management. Learn about best practices and how to implement effective controls in your organization.</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>May 2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      123 likes
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      32 comments
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Post 2 */}
          <div className="linkedin-post bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <a href="https://www.linkedin.com/posts/scia-global_itgc-accessmanagement-itaudit-activity-7316348034513010689-RU3B" target="_blank" rel="noopener noreferrer" className="block">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">ITGC & Access Management - IT Audit</h3>
                <p className="text-gray-600 mb-4">Understanding the importance of IT Governance and Control in modern organizations. Learn how to effectively manage access and maintain compliance.</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>May 2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      98 likes
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      24 comments
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Post 3 */}
          <div className="linkedin-post bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <a href="https://www.linkedin.com/posts/scia-global_iso-iso27001-itgc-activity-7315687441644883968-TX4-" target="_blank" rel="noopener noreferrer" className="block">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">ISO 27001 & ITGC</h3>
                <p className="text-gray-600 mb-4">Discover how ISO 27001 and IT Governance Controls work together to create a robust security framework for your organization.</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>May 2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      156 likes
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      45 comments
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Post 4 */}
          <div className="linkedin-post bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <a href="https://www.linkedin.com/posts/reddem-mallikarjuna-reddy_itgcs-access-management-webinar-ugcPost-7314838126131040256-Js8g" target="_blank" rel="noopener noreferrer" className="block">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">ITGCS & Access Management - Webinar</h3>
                <p className="text-gray-600 mb-4">Join our expert panel discussion on IT Governance, Controls, and Security. Learn practical strategies for implementing effective access management.</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>May 2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      87 likes
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      38 comments
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};