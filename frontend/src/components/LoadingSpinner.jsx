import React from 'react';

const LoadingSpinner = ({ text = "Analyzing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-teal-400 rounded-full animate-spin"></div>
      <p className="text-gray-300 font-semibold">{text}</p>
    </div>
  );
};

export default LoadingSpinner;