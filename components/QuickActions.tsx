
import React from 'react';
import type { Language } from '../types';

interface QuickActionsProps {
  language: Language;
  portal: 'freelancer' | 'client' | null;
  onNavigate: (tab: string) => void;
}

const FreelancerActions: React.FC<{ language: Language, onNavigate: (tab: string) => void }> = ({ language, onNavigate }) => (
    <>
        <button 
            onClick={() => onNavigate('projects')}
            className="w-full text-center p-4 rounded-lg bg-white text-green-600 hover:bg-green-50 transition-transform hover:scale-105 shadow-md font-bold"
        >
            {language === 'en' ? 'Browse All Projects' : 'सबै परियोजनाहरू ब्राउज गर्नुहोस्'}
        </button>
        <button 
            onClick={() => onNavigate('profile')}
            className="w-full text-center p-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-transform hover:scale-105 shadow-md font-bold"
        >
            {language === 'en' ? 'Update Your Profile' : 'आफ्नो प्रोफाइल अपडेट गर्नुहोस्'}
        </button>
    </>
);

const ClientActions: React.FC<{ language: Language, onNavigate: (tab: string) => void }> = ({ language, onNavigate }) => (
    <>
        <button 
            onClick={() => onNavigate('postProject')}
            className="w-full text-center p-4 rounded-lg bg-white text-green-600 hover:bg-green-50 transition-transform hover:scale-105 shadow-md font-bold"
        >
            {language === 'en' ? 'Post a New Project' : 'नयाँ परियोजना पोस्ट गर्नुहोस्'}
        </button>
        <button 
            onClick={() => onNavigate('manageProjects')}
            className="w-full text-center p-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-transform hover:scale-105 shadow-md font-bold"
        >
            {language === 'en' ? 'Manage My Projects' : 'मेरा परियोजनाहरू व्यवस्थापन गर्नुहोस्'}
        </button>
    </>
);


const QuickActions: React.FC<QuickActionsProps> = ({ language, portal, onNavigate }) => {
  return (
    <section className="bg-green-600 rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
                <h2 className="text-3xl font-bold">{language === 'en' ? 'Ready to Get Started?' : 'सुरु गर्न तयार हुनुहुन्छ?'}</h2>
                <p className="mt-2 text-green-200">
                    {portal === 'client'
                        ? (language === 'en' ? 'Post your project and find the perfect freelancer today.' : 'आफ्नो परियोजना पोस्ट गर्नुहोस् र आज सही स्वतन्त्रकर्ता खोज्नुहोस्।')
                        : (language === 'en' ? 'Your next opportunity is just a click away.' : 'तपाईंको अर्को अवसर केवल एक क्लिक टाढा छ।')
                    }
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portal === 'client' 
                ? <ClientActions language={language} onNavigate={onNavigate} /> 
                : <FreelancerActions language={language} onNavigate={onNavigate} />
              }
            </div>
        </div>
    </section>
  );
};

export default QuickActions;
