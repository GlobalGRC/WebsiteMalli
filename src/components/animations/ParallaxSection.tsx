import React, { useRef, useEffect, useState } from 'react';

type ParallaxSectionProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5,
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Get the distance from the top of the viewport to the section
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const elementTop = scrollTop + rect.top;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      // as a percentage of the viewport height
      const viewportCenter = scrollTop + viewportHeight / 2;
      const elementPosition = elementTop + rect.height / 2;
      const distanceFromCenter = elementPosition - viewportCenter;
      
      // Scale this by the speed factor
      const parallaxOffset = distanceFromCenter * speed;
      
      setOffset(parallaxOffset);
    };

    // Initial calculation
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};