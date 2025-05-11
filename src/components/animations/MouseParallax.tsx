import React, { useEffect, useRef } from 'react';

interface MouseParallaxProps {
  children: React.ReactNode;
  className?: string;
  factor?: number;
}

export const MouseParallax: React.FC<MouseParallaxProps> = ({
  children,
  className = '',
  factor = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) * factor;
      const moveY = (e.clientY - centerY) * factor;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [factor]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}; 