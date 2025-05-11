import React from 'react';

type StatCardProps = {
  number: string;
  label: string;
  description: string;
};

export const StatCard: React.FC<StatCardProps> = ({ number, label, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-[#E60028] text-3xl font-bold mb-2">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{label}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};