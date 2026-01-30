
import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import SplashScreen from './pages/SplashScreen';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPortalSelectorPage from './pages/LoginPortalSelectorPage';

const App: React.FC = () => {
  const [page, setPage] = useState<'splash' | 'landing' | 'login' | 'signup' | 'home'>('splash');
  const [portal, setPortal] = useState<'freelancer' | 'client' | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [initialLoginPortal, setInitialLoginPortal] = useState<'freelancer' | 'client' | null>(null);
  const [initialSignupPortal, setInitialSignupPortal] = useState<'freelancer' | 'client' | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setPage('landing');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToLogin = (selectedPortal?: 'freelancer' | 'client') => {
    setInitialLoginPortal(null); // Always show the portal selector first
    setInitialSignupPortal(null);
    setPage('login');
  };

  const handleGoToSignup = (selectedPortal?: 'freelancer' | 'client') => {
    setInitialSignupPortal(selectedPortal || null);
    setInitialLoginPortal(null);
    setPage('signup');
  };

  const handleGoToLanding = () => {
    setPortal(null);
    setInitialLoginPortal(null);
    setInitialSignupPortal(null);
    setPage('landing');
  };

  const handleLogin = (loggedInPortal: 'freelancer' | 'client') => {
    setPortal(loggedInPortal);
    setPage('home');
  };

  const handleSignup = (signedUpPortal: 'freelancer' | 'client') => {
    // In a real app, this would involve API calls. Here we simulate success.
    setPortal(signedUpPortal);
    setPage('home');
  };
  
  const handleLogout = () => {
    setPortal(null);
    setPage('landing');
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'np' : 'en'));
  };

  switch (page) {
    case 'splash':
      return <SplashScreen />;
    case 'landing':
      return <LandingPage language={language} toggleLanguage={toggleLanguage} onGoToLogin={handleGoToLogin} />;
    case 'login':
      return <LoginPortalSelectorPage 
                language={language}
                toggleLanguage={toggleLanguage}
                onLogin={handleLogin}
                onGoToLanding={handleGoToLanding}
                onGoToSignup={handleGoToSignup}
                initialPortal={initialLoginPortal}
             />;
    case 'signup':
      return <SignupPage
                onSignup={handleSignup}
                language={language}
                toggleLanguage={toggleLanguage}
                onGoToLanding={handleGoToLanding}
                onGoToLogin={handleGoToLogin}
                initialPortal={initialSignupPortal}
              />;
    case 'home':
      return <HomePage language={language} toggleLanguage={toggleLanguage} onLogout={handleLogout} portal={portal} />;
    default:
      return <LandingPage language={language} toggleLanguage={toggleLanguage} onGoToLogin={handleGoToLogin} />;
  }
};

export default App;