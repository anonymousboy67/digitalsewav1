
import React from 'react';
import { GlobeIcon } from './icons';
import type { Language } from '../types';
import LogoWordmark from './LogoWordmark';

interface LandingHeaderProps {
  language: Language;
  toggleLanguage: () => void;
  onGoToLogin: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ language, toggleLanguage, onGoToLogin }) => {
    
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-8">
                <LogoWordmark size="md" />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
                <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <GlobeIcon className="w-6 h-6 text-gray-600" />
                </button>
                <button onClick={onGoToLogin} className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors">
                    {language === 'en' ? 'Login / Signup' : 'लगइन / साइनअप'}
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;