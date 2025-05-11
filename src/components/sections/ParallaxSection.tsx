import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section
      style={{ y }}
      className={className}
    >
      {children}
    </motion.section>
  );
}; 