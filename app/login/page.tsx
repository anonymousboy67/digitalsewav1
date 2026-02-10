'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FreelancersIcon, ProjectsIcon, EyeIcon, EyeOffIcon } from '../../components/icons';
import LogoWordmark from '../../components/LogoWordmark';

type Portal = 'freelancer' | 'client';
type Language = 'en' | 'np';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPortal = searchParams.get('portal') as Portal | null;

  const [language, setLanguage] = useState<Language>('en');
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(initialPortal);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedPortal(initialPortal);
  }, [initialPortal]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'np' : 'en');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PortalSelector = () => (
    <div className="animate-fade-in">
      <div className="space-y-4">
        <div>
          <Link href="/" className="mb-4 inline-block">
            <LogoWordmark size="lg" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">
            {language === 'en' ? 'Log in to DigitalSewa' : 'डिजिटलसेवामा लगइन गर्नुहोस्'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {language === 'en' ? 'First, please select your account type.' : 'पहिला, कृपया आफ्नो खाताको प्रकार चयन गर्नुहोस्।'}
          </p>
        </div>
        <div className="pt-2 space-y-3">
          <button
            onClick={() => setSelectedPortal('client')}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group flex items-center space-x-4"
          >
            <ProjectsIcon className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-bold text-gray-800">{language === 'en' ? 'I am a Client' : 'म एक ग्राहक हुँ'}</h3>
              <p className="text-xs text-gray-500">{language === 'en' ? 'Hiring for a project' : 'परियोजनाको लागि काममा लगाउँदै'}</p>
            </div>
          </button>
          <button
            onClick={() => setSelectedPortal('freelancer')}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group flex items-center space-x-4"
          >
            <FreelancersIcon className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-bold text-gray-800">{language === 'en' ? 'I am a Freelancer' : 'म एक स्वतन्त्रकर्ता हुँ'}</h3>
              <p className="text-xs text-gray-500">{language === 'en' ? 'Looking for work' : 'काम खोजदै छु'}</p>
            </div>
          </button>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">{language === 'en' ? "Don't have an account?" : 'खाता छैन?'}</p>
        <div className="space-y-2">
          <Link
            href="/signup?role=client"
            className="block w-full text-sm font-semibold p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-center"
          >
            {language === 'en' ? 'Sign up as a Client' : 'ग्राहकको रूपमा साइन अप गर्नुहोस्'}
          </Link>
          <Link
            href="/signup?role=freelancer"
            className="block w-full text-sm font-semibold p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-center"
          >
            {language === 'en' ? 'Sign up as a Freelancer' : 'स्वतन्त्रकर्ताको रूपमा साइन अप गर्नुहोस्'}
          </Link>
        </div>
      </div>
    </div>
  );

  const LoginForm = () => {
    const portalText = selectedPortal === 'client' ? { en: 'Client', np: 'ग्राहक' } : { en: 'Freelancer', np: 'स्वतन्त्रकर्ता' };

    return (
      <div className="animate-fade-in">
        <div className="mb-4">
          <Link href="/" className="mb-4 inline-block">
            <LogoWordmark size="lg" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">
            {language === 'en' ? `Log in as a ${portalText.en}` : `${portalText.np} को रूपमा लगइन गर्नुहोस्`}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {language === 'en' ? 'Enter your details below.' : 'तल आफ्नो विवरण प्रविष्ट गर्नुहोस्।'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="text-base appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            type="email"
            placeholder={language === 'en' ? 'Email' : 'इमेल'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              className="text-base appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pr-12 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              type={showPassword ? 'text' : 'password'}
              placeholder={language === 'en' ? 'Password' : 'पासवर्ड'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center text-sm text-gray-700 select-none cursor-pointer">
              <input type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
              <span className="ml-2">{language === 'en' ? 'Remember Me' : 'मलाई सम्झनुहोस्'}</span>
            </label>
            <a className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800" href="#">
              {language === 'en' ? 'Forgot Password?' : 'पासवर्ड बिर्सनुभयो?'}
            </a>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg !mt-6 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? (language === 'en' ? 'Logging in...' : 'लग इन हुँदैछ...') : language === 'en' ? 'Log In' : 'लग - इन गर्नुहोस्'}
          </button>
          <div className="text-center text-sm text-gray-600 pt-2">
            <p>
              {language === 'en' ? 'Not a' : ''} {portalText[language === 'en' ? 'en' : 'np']}
              {language === 'np' ? ' होइन' : ''}?
              <button type="button" onClick={() => setSelectedPortal(null)} className="font-semibold text-green-600 hover:underline ml-1">
                {language === 'en' ? 'Go Back' : 'पछाडि जानुहोस्'}
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-8 text-center">
          {!selectedPortal ? <PortalSelector /> : <LoginForm />}
        </div>
      </main>
      <footer className="text-center py-4 px-4 bg-white text-xs text-gray-500">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <span>English (UK)</span>
            <button onClick={toggleLanguage} className="text-green-600 hover:underline">
              नेपाली
            </button>
          </div>
          <p className="mt-2">&copy; {new Date().getFullYear()} DigitalSewa</p>
        </div>
      </footer>
    </div>
  );
}
