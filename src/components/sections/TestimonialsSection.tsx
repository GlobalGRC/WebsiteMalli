import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ParallaxSection } from '../sections/ParallaxSection';
import { useAdmin } from '../../context/AdminContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useAdmin();

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how SCIA Global has helped organizations across industries enhance their security, compliance, and risk management capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}; 