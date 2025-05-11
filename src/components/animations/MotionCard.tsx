import React, { useRef, useEffect, useState } from 'react';

type MotionCardProps = {
  children: React.ReactNode;
  className?: string;
  depth?: number;
};

export const MotionCard: React.FC<MotionCardProps> = ({ 
  children, 
  className = '',
  depth = 15 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseOn, setMouseOn] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * depth;
      const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * depth;
      
      setRotation({ x: rotateX, y: rotateY });
      
      // Calculate subtle position shift for parallax effect
      const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 5;
      const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 5;
      
      setPosition({ x: moveX, y: moveY });
    };

    const handleMouseEnter = () => {
      setMouseOn(true);
    };

    const handleMouseLeave = () => {
      setMouseOn(false);
      // Reset rotation and position when mouse leaves
      setRotation({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [depth]);

  const style = {
    transform: mouseOn
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px) translateX(${position.x}px) translateY(${position.y}px)`
      : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
    transition: mouseOn
      ? 'transform 0.1s ease-out'
      : 'transform 0.5s ease-out'
  };

  return (
    <div 
      ref={cardRef} 
      className={`relative ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};