import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { ImageSlider } from '../animations/ImageSlider';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* 3D Background Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y, opacity }}
          className="w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm" />
        </motion.div>
      </div>
      
      {/* Top Image Slider with 3D Effect */}
      <motion.div 
        className="w-full relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ImageSlider />
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typewriter
              words={[
                'Empowering Global Innovation',
                'Secure. Compliant. Resilient.',
                'Leading Digital Transformation',
                'Your Trusted Technology Partner'
              ]}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Leading the way in cybersecurity, IT assurance, and risk consulting.
            Protecting your digital future with cutting-edge solutions.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E60028] text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 hover:bg-[#c4001f] transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#E60028] px-8 py-4 rounded-lg font-medium flex items-center gap-2 border-2 border-[#E60028] hover:bg-[#E60028]/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[
              { icon: Shield, title: "Secure Solutions", description: "Advanced protection for your digital assets" },
              { icon: Zap, title: "Fast Response", description: "24/7 support and rapid incident response" },
              { icon: Globe, title: "Global Support", description: "Worldwide network of security experts" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  rotateY: 5
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-[#E60028]" />
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};