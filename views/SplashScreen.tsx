
import React from 'react';
import LogoIcon from '../components/LogoIcon';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 font-sans">
      <div className="animate-pulse">
        <LogoIcon className="w-24 h-24" />
      </div>
      <p className="mt-4 text-lg text-gray-600">Nepal's Freelance Marketplace</p>
    </div>
  );
};

export default SplashScreen;
