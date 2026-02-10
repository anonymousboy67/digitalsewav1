
import React, { useState, useEffect } from 'react';
import { FreelancersIcon, ProjectsIcon, EyeIcon, EyeOffIcon } from '../components/icons';
import type { Language } from '../types';
import LogoWordmark from '../components/LogoWordmark';

type Portal = 'freelancer' | 'client';

interface LoginPortalSelectorPageProps {
  language: Language;
  onLogin: (portal: Portal) => void;
  onGoToLanding: () => void;
  toggleLanguage: () => void;
  onGoToSignup: (portal: Portal) => void;
  initialPortal: Portal | null;
}

const PortalSelector: React.FC<{
    language: Language;
    onSelect: (portal: Portal) => void;
    onGoToSignup: (portal: Portal) => void;
    onGoToLanding: () => void;
}> = ({ language, onSelect, onGoToSignup, onGoToLanding }) => (
    <div className="animate-fade-in">
        <div className="space-y-4">
            <div>
                <button onClick={onGoToLanding} className="mb-4 inline-block">
                    <LogoWordmark size="lg" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">{language === 'en' ? 'Log in to kaamgarau' : 'कामगरौमा लगइन गर्नुहोस्'}</h2>
                <p className="text-gray-600 text-sm mt-1">{language === 'en' ? 'First, please select your account type.' : 'पहिला, कृपया आफ्नो खाताको प्रकार चयन गर्नुहोस्।'}</p>
            </div>
            <div className="pt-2 space-y-3">
                 <button onClick={() => onSelect('client')} className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group flex items-center space-x-4">
                    <ProjectsIcon className="w-8 h-8 text-green-600" />
                    <div>
                        <h3 className="font-bold text-gray-800">{language === 'en' ? 'I am a Client' : 'म एक ग्राहक हुँ'}</h3>
                        <p className="text-xs text-gray-500">{language === 'en' ? 'Hiring for a project' : 'परियोजनाको लागि काममा लगाउँदै'}</p>
                    </div>
                </button>
                 <button onClick={() => onSelect('freelancer')} className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group flex items-center space-x-4">
                    <FreelancersIcon className="w-8 h-8 text-green-600" />
                    <div>
                        <h3 className="font-bold text-gray-800">{language === 'en' ? 'I am a Freelancer' : 'म एक स्वतन्त्रकर्ता हुँ'}</h3>
                        <p className="text-xs text-gray-500">{language === 'en' ? 'Looking for work' : 'काम खोजदै छु'}</p>
                    </div>
                </button>
            </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            {language === 'en' ? "Don't have an account?" : "खाता छैन?"}
          </p>
          <div className="space-y-2">
             <button onClick={() => onGoToSignup('client')} className="w-full text-sm font-semibold p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                 {language === 'en' ? 'Sign up as a Client' : 'ग्राहकको रूपमा साइन अप गर्नुहोस्'}
             </button>
             <button onClick={() => onGoToSignup('freelancer')} className="w-full text-sm font-semibold p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                 {language === 'en' ? 'Sign up as a Freelancer' : 'स्वतन्त्रकर्ताको रूपमा साइन अप गर्नुहोस्'}
             </button>
          </div>
        </div>
    </div>
);

const LoginForm: React.FC<{
    language: Language;
    portal: Portal;
    onLogin: (portal: Portal) => void;
    onBack: () => void;
}> = ({ language, portal, onLogin, onBack }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(portal);
    };

    const portalText = portal === 'client'
        ? { en: 'Client', np: 'ग्राहक' }
        : { en: 'Freelancer', np: 'स्वतन्त्रकर्ता' };

    return (
        <div className="animate-fade-in">
             <div className="mb-4">
                <button onClick={onBack} className="mb-4 inline-block">
                    <LogoWordmark size="lg" />
                </button>
                 <h2 className="text-xl font-bold text-gray-800">{language === 'en' ? `Log in as a ${portalText.en}` : `${portalText.np} को रूपमा लगइन गर्नुहोस्`}</h2>
                 <p className="text-gray-600 text-sm mt-1">{language === 'en' ? 'Enter your details below.' : 'तल आफ्नो विवरण प्रविष्ट गर्नुहोस्।'}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="text-base appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    id="username"
                    type="text"
                    placeholder={language === 'en' ? 'Email or Phone' : 'इमेल वा फोन'}
                    defaultValue={`demo@${portal}.com`}
                />
                <div className="relative">
                    <input
                        className="text-base appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pr-12 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={language === 'en' ? 'Password' : 'पासवर्ड'}
                        defaultValue="password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      aria-label={language === 'en' ? (showPassword ? 'Hide password' : 'Show password') : (showPassword ? 'पासवर्ड लुकाउनुहोस्' : 'पासवर्ड देखाउनुहोस्')}
                    >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center text-sm text-gray-700 select-none cursor-pointer">
                        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2">{language === 'en' ? 'Remember Me' : 'मलाई सम्झनुहोस्'}</span>
                    </label>
                    <a className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800" href="#">
                        {language === 'en' ? 'Forgot Password?' : 'पासवर्ड बिर्सनुभयो?'}
                    </a>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg !mt-6" type="submit">
                  {language === 'en' ? 'Log In' : 'लग - इन गर्नुहोस्'}
                </button>
                 <div className="text-center text-sm text-gray-600 pt-2">
                    <p>
                        {language === 'en' ? 'Not a' : ''} {portalText[language]}
                        {language === 'np' ? ' होइन' : ''}?
                        <button onClick={onBack} className="font-semibold text-green-600 hover:underline ml-1">
                            {language === 'en' ? 'Go Back' : 'पछाडि जानुहोस्'}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

const LoginPortalSelectorPage: React.FC<LoginPortalSelectorPageProps> = ({ language, onLogin, onGoToLanding, toggleLanguage, onGoToSignup, initialPortal }) => {
    const [selectedPortal, setSelectedPortal] = useState<Portal | null>(initialPortal);

    useEffect(() => {
        setSelectedPortal(initialPortal);
    }, [initialPortal]);

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-8 text-center">
                    {!selectedPortal ? (
                        <PortalSelector
                            language={language}
                            onSelect={setSelectedPortal}
                            onGoToSignup={onGoToSignup}
                            onGoToLanding={onGoToLanding}
                        />
                    ) : (
                        <LoginForm
                            language={language}
                            portal={selectedPortal}
                            onLogin={onLogin}
                            onBack={() => setSelectedPortal(null)}
                        />
                    )}
                </div>
            </main>
            <footer className="text-center py-4 px-4 bg-white text-xs text-gray-500">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center items-center space-x-4 mb-2">
                        <span>English (UK)</span>
                        <button onClick={toggleLanguage} className="text-green-600 hover:underline">नेपाली</button>
                    </div>
                    <p className="mt-2">&copy; {new Date().getFullYear()} kaamgarau</p>
                </div>
            </footer>
        </div>
    );
};

export default LoginPortalSelectorPage;
