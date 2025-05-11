import React from 'react';

type TabProps = {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: () => void;
};

export const Tab: React.FC<TabProps> = ({ 
  label, 
  icon, 
  active = false, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${active 
          ? 'bg-[#E60028] text-white shadow-md' 
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};