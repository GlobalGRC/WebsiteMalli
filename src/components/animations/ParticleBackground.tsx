import { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-red-500/20';
      
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 10 + 10;
      const xMove = Math.random() * 100 - 50;
      const yMove = Math.random() * 100 - 50;

      particle.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: `translate(${xMove}px, ${yMove}px)` },
          { transform: 'translate(0, 0)' },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/5 to-transparent" />
    </div>
  );
};
