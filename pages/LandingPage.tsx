
import React from 'react';
import type { Language, Project, Freelancer } from '../types';
import LandingHeader from '../components/LandingHeader';
import Stats from '../components/Stats';
import Categories from '../components/Categories';
import FeaturedProjects from '../components/FeaturedProjects';
import TopFreelancers from '../components/TopFreelancers';
import Footer from '../components/Footer';
import { projectsData, freelancersData } from '../data/mockData';

interface LandingPageProps {
    language: Language;
    toggleLanguage: () => void;
    onGoToLogin: (portal?: 'freelancer' | 'client') => void;
}

const HeroSection: React.FC<{ language: Language, onGoToLogin: (portal: 'freelancer' | 'client') => void }> = ({ language, onGoToLogin }) => (
    <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
            {language === 'en' ? 'Find & Hire Top Talent in Nepal' : 'नेपालमा शीर्ष प्रतिभा खोज्नुहोस् र भाडामा लिनुहोस्'}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en' ? 'kaamgarau is the leading freelance marketplace connecting businesses with skilled professionals for any project.' : 'कामगरौ कुनै पनि परियोजनाको लागि दक्ष पेशेवरहरूसँग व्यवसायहरूलाई जोड्ने प्रमुख स्वतन्त्र बजार हो।'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => onGoToLogin('client')} className="px-8 py-3 rounded-lg text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-transform hover:scale-105 shadow-lg w-full sm:w-auto">
                {language === 'en' ? 'Hire Talent' : 'प्रतिभा भाडामा लिनुहोस्'}
            </button>
             <button onClick={() => onGoToLogin('freelancer')} className="px-8 py-3 rounded-lg text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-transform hover:scale-105 shadow-lg w-full sm:w-auto">
                {language === 'en' ? 'Find Work' : 'काम खोज्नुहोस्'}
            </button>
        </div>
    </section>
);


const LandingPage: React.FC<LandingPageProps> = ({ language, toggleLanguage, onGoToLogin }) => {
  
  const handleViewProject = (project: Project) => {
    // On the public landing page, clicking a project should prompt login.
    onGoToLogin();
  };
  
  const handleViewFreelancer = (freelancer: Freelancer) => {
    // On the public landing page, clicking a profile should prompt login.
    onGoToLogin();
  };

  const handleToggleSaveProject = (projectId: string) => {
    // On the public landing page, clicking save should prompt login.
    onGoToLogin();
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <LandingHeader 
        language={language} 
        toggleLanguage={toggleLanguage} 
        onGoToLogin={onGoToLogin}
      />
      <main className="flex-grow w-full">
        <HeroSection language={language} onGoToLogin={onGoToLogin} />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
                <Stats language={language} />
                <Categories language={language} />
                {/* FIX: Add missing savedProjects and onToggleSaveProject props */}
                <FeaturedProjects 
                    language={language} 
                    projects={projectsData} 
                    onViewProject={handleViewProject} 
                    savedProjects={new Set<string>()}
                    onToggleSaveProject={handleToggleSaveProject}
                />
                <TopFreelancers language={language} freelancers={freelancersData} onViewProfile={handleViewFreelancer} />
            </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default LandingPage;