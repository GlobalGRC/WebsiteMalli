import React from 'react';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  className = '',
  onClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an anchor link, handle smooth scrolling
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for header
          behavior: 'smooth',
        });
      }
      
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};