import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Our <span className="text-[#E60028]">Clients Say</span>
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Google Reviews Widget */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Exceptional service and expertise. The team at SCIA Global provided comprehensive security solutions that exceeded our expectations."
            </p>
            <p className="text-sm text-gray-400 mt-4">2 weeks ago</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <h3 className="font-semibold">Jane Smith</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Professional and knowledgeable team. They helped us implement robust security measures that have significantly improved our operations."
            </p>
            <p className="text-sm text-gray-400 mt-4">1 month ago</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <h3 className="font-semibold">Robert Johnson</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Outstanding cybersecurity services. The team's expertise and dedication to our security needs have been invaluable to our business."
            </p>
            <p className="text-sm text-gray-400 mt-4">2 months ago</p>
          </motion.div>
        </motion.div>
        
        {/* Google Reviews Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a 
            href="https://g.page/r/ChIJw7F-rYuXyzsRFpkPdMi1ckI/review"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-[#E60028] text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Leave a Review
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}; 