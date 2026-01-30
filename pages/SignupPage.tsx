
import React, { useState, useEffect } from 'react';
import { GlobeIcon, ArrowLeftIcon, FreelancersIcon, ProjectsIcon } from '../components/icons';
import type { Language } from '../types';
import LogoWordmark from '../components/LogoWordmark';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';

type Portal = 'freelancer' | 'client';

interface SignupPageProps {
  onSignup: (portal: Portal) => void;
  language: Language;
  toggleLanguage: () => void;
  onGoToLanding: () => void;
  onGoToLogin: (portal: Portal) => void;
  initialPortal: Portal | null;
}

const portalConfig = {
    client: {
        title: { en: 'Create a Client Account', np: 'ग्राहक खाता सिर्जना गर्नुहोस्' },
        subtitle: { en: 'Sign up to find the best talent for your projects.', np: 'आफ्नो परियोजनाहरूको लागि उत्कृष्ट प्रतिभा खोज्न साइन अप गर्नुहोस्।' },
        loginPrompt: { en: "Already have an account?", np: "पहिले नै खाता छ?" },
        loginLink: { en: 'Log In', np: 'लग - इन' },
    },
    freelancer: {
        title: { en: 'Create a Freelancer Account', np: 'स्वतन्त्रकर्ता खाता सिर्जना गर्नुहोस्' },
        subtitle: { en: 'Join our community of skilled professionals.', np: 'हाम्रो दक्ष पेशेवरहरूको समुदायमा सामेल हुनुहोस्।' },
        loginPrompt: { en: "Already have an account?", np: "पहिले नै खाता छ?" },
        loginLink: { en: 'Log In', np: 'लग - इन' },
    }
};

const PortalSelector: React.FC<{ language: Language, onSelect: (portal: Portal) => void, onGoToLanding: () => void }> = ({ language, onSelect, onGoToLanding }) => (
    <div className="w-full max-w-md text-center">
        <button onClick={onGoToLanding} className="inline-block mb-6">
            <LogoWordmark size="lg" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-2">{language === 'en' ? 'Join as a Client or Freelancer' : 'ग्राहक वा स्वतन्त्रकर्ताको रूपमा सामेल हुनुहोस्'}</h2>
        <p className="text-gray-600 mb-8">{language === 'en' ? 'How would you like to use kaamgarau?' : 'तपाईं कामगरौ कसरी प्रयोग गर्न चाहनुहुन्छ?'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => onSelect('client')} className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                <ProjectsIcon className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-800">{language === 'en' ? 'I\'m a Client' : 'म एक ग्राहक हुँ'}</h3>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Hiring for a project' : 'परियोजनाको लागि काममा लगाउँदै'}</p>
            </button>
            <button onClick={() => onSelect('freelancer')} className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                <FreelancersIcon className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-800">{language === 'en' ? 'I\'m a Freelancer' : 'म एक स्वतन्त्रकर्ता हुँ'}</h3>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Looking for work' : 'काम खोजदै छु'}</p>
            </button>
        </div>
    </div>
);

const SignupForm: React.FC<{ language: Language, portal: Portal, onSignup: (portal: Portal) => void, onGoToLanding: () => void, onGoToLogin: (portal: Portal) => void }> = ({ language, portal, onSignup, onGoToLanding, onGoToLogin }) => {
    const config = portalConfig[portal];
    const [agreed, setAgreed] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (agreed) {
            onSignup(portal);
        } else {
            alert(language === 'en' ? 'Please agree to the terms and conditions.' : 'कृपया नियम र सर्तहरूमा सहमत हुनुहोस्।');
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="text-center mb-8">
                <button type="button" onClick={onGoToLanding} className="inline-block">
                    <LogoWordmark size="lg" />
                </button>
                <h2 className="mt-4 text-xl font-bold text-gray-800">{config.title[language]}</h2>
                <p className="text-gray-600">{config.subtitle[language]}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                  {language === 'en' ? 'Full Name' : 'पूरा नाम'}
                </label>
                <input className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" id="fullname" type="text" placeholder={language === 'en' ? 'e.g. Sita Sharma' : 'उदाहरण: सीता शर्मा'} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  {language === 'en' ? 'Email or Phone' : 'इमेल वा फोन'}
                </label>
                <input className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" id="email" type="text" placeholder={language === 'en' ? 'you@example.com' : 'you@example.com'} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  {language === 'en' ? 'Password' : 'पासवर्ड'}
                </label>
                <input 
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" 
                  id="password" 
                  type="password" 
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordStrengthIndicator password={password} language={language} />
              </div>
               <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                  {language === 'en' ? 'Confirm Password' : 'पासवर्ड पुष्टि गर्नुहोस्'}
                </label>
                <input className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" id="confirm_password" type="password" placeholder="************" />
              </div>
              <div className="mb-6">
                 <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 rounded" checked={agreed} onChange={() => setAgreed(!agreed)} />
                    <span className="ml-2 text-gray-700 text-sm">
                        {language === 'en' ? 'I agree to the' : 'म सहमत छु'}
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 hover:underline"> {language === 'en' ? 'Terms of Service' : 'सेवाका सर्तहरू'}</a> & 
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 hover:underline"> {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</a>
                    </span>
                 </label>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg disabled:bg-gray-400" type="submit" disabled={!agreed}>
                  {language === 'en' ? 'Create Account' : 'खाता बनाउनुहोस्'}
                </button>
              </div>

               <p className="text-center text-gray-500 text-sm mt-6">
                {config.loginPrompt[language]}{' '}
                <button type="button" onClick={() => onGoToLogin(portal)} className="font-bold text-green-500 hover:text-green-800">
                  {config.loginLink[language]}
                </button>
              </p>
            </form>
        </div>
    );
};


const SignupPage: React.FC<SignupPageProps> = ({ onSignup, language, toggleLanguage, onGoToLanding, onGoToLogin, initialPortal }) => {
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(initialPortal);

  useEffect(() => {
    setSelectedPortal(initialPortal);
  }, [initialPortal]);

  const handleBack = () => {
    if (selectedPortal && !initialPortal) {
        setSelectedPortal(null);
    } else {
        onGoToLanding();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4 relative">
       <div className="absolute top-4 right-4">
           <button onClick={toggleLanguage} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <GlobeIcon className="w-6 h-6 text-gray-600" />
            <span className="font-semibold text-gray-700">{language === 'en' ? 'EN' : 'ने'}</span>
          </button>
       </div>
        <div className="absolute top-4 left-4">
           <button onClick={handleBack} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 font-semibold">
            <ArrowLeftIcon className="w-6 h-6" />
            <span>{language === 'en' ? 'Back' : 'पछाडि'}</span>
          </button>
       </div>

        {selectedPortal ? (
            <SignupForm language={language} portal={selectedPortal} onSignup={onSignup} onGoToLanding={onGoToLanding} onGoToLogin={onGoToLogin} />
        ) : (
            <PortalSelector language={language} onSelect={setSelectedPortal} onGoToLanding={onGoToLanding} />
        )}
    </div>
  );
};

export default SignupPage;
