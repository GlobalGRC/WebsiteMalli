import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: 'https://studio.openweaver.com/preassets/mediaassets/152668da715b461b9db08d3e864f80cc/image/cyberimage.webp',
    alt: 'Cybersecurity Team',
    title: 'CYBERSECURITY & IT ASSURANCE',
    category: 'SERVICES'
  },
  {
    url: 'https://studio.openweaver.com/preassets/mediaassets/152668da715b461b9db08d3e864f80cc/image/Riskconsulting.webp',
    alt: 'IT Assurance',
    title: 'RISK CONSULTING',
    category: 'SERVICES'
  },
  {
    url: 'https://studio.openweaver.com/preassets/mediaassets/152668da715b461b9db08d3e864f80cc/image/Auditandassurance.webp',
    alt: 'Risk Management',
    title: 'COMPLIANCE SERVICES',
    category: 'SERVICES'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Compliance Services',
    title: 'CO-SOURCING',
    category: 'SERVICES'
  }
];

export const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[90rem] mx-auto mt-24">
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        {/* Images */}
        <div className="relative h-[45vh] min-h-[400px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : index === (currentIndex + 1) % images.length
                  ? 'opacity-0 translate-x-full'
                  : index === (currentIndex - 1 + images.length) % images.length
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content Container */}
              <div className="absolute inset-0">
                <div className="container mx-auto px-16 h-full flex flex-col justify-end pb-16">
                  <div className="max-w-5xl">
                    {/* Category */}
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-[#E60028] text-white text-sm font-medium rounded-full">
                        {image.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-5xl font-bold text-white mb-6 uppercase tracking-wide">{image.title}</h3>
                    
                    {/* Action Button */}
                    <button className="bg-white text-[#E60028] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls - Corner Positioned */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}; 