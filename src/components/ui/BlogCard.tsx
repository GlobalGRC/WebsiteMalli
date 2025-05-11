import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Link } from '../../utils/Link';

type BlogCardProps = {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
};

export const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  excerpt, 
  image, 
  author, 
  date, 
  category 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#E60028] text-white text-xs px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">
          <Link href="#" className="hover:text-[#E60028]">
            {title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center mr-4">
            <User className="h-4 w-4 mr-1" />
            {author}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>
        
        <Link 
          href="#"
          className="text-[#E60028] font-medium flex items-center hover:underline mt-auto"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};