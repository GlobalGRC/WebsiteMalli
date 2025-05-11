import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../utils/Link';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientClass?: string;
  borderColor?: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description,
  gradientClass = 'from-gray-50 to-white',
  borderColor = 'border-gray-100'
}) => {
  return (
    <div className={`h-full bg-gradient-to-br ${gradientClass} rounded-2xl shadow-md border ${borderColor} p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link 
        href="#"
        className="text-[#E60028] font-medium flex items-center hover:underline"
      >
        Learn More
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};