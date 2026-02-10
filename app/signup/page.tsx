'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GlobeIcon, ArrowLeftIcon, FreelancersIcon, ProjectsIcon } from '../../components/icons';
import LogoWordmark from '../../components/LogoWordmark';
import PasswordStrengthIndicator from '../../components/PasswordStrengthIndicator';

type Portal = 'freelancer' | 'client';
type Language = 'en' | 'np';

const portalConfig = {
  client: {
    title: { en: 'Create a Client Account', np: 'ग्राहक खाता सिर्जना गर्नुहोस्' },
    subtitle: { en: 'Sign up to find the best talent for your projects.', np: 'आफ्नो परियोजनाहरूको लागि उत्कृष्ट प्रतिभा खोज्न साइन अप गर्नुहोस्।' },
  },
  freelancer: {
    title: { en: 'Create a Freelancer Account', np: 'स्वतन्त्रकर्ता खाता सिर्जना गर्नुहोस्' },
    subtitle: { en: 'Join our community of skilled professionals.', np: 'हाम्रो दक्ष पेशेवरहरूको समुदायमा सामेल हुनुहोस्।' },
  },
};

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as Portal | null;

  const [language, setLanguage] = useState<Language>('en');
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedPortal(initialRole);
  }, [initialRole]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'np' : 'en');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError(language === 'en' ? 'Please agree to the terms and conditions.' : 'कृपया नियम र सर्तहरूमा सहमत हुनुहोस्।');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match.' : 'पासवर्डहरू मेल खाँदैनन्।');
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters.' : 'पासवर्ड कम्तिमा ६ वर्णको हुनुपर्छ।');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedPortal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push(`/login?portal=${selectedPortal}&registered=true`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedPortal && !initialRole) {
      setSelectedPortal(null);
    } else {
      router.push('/');
    }
  };

  const PortalSelector = () => (
    <div className="w-full max-w-md text-center">
      <Link href="/" className="inline-block mb-6">
        <LogoWordmark size="lg" />
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-2">
        {language === 'en' ? 'Join as a Client or Freelancer' : 'ग्राहक वा स्वतन्त्रकर्ताको रूपमा सामेल हुनुहोस्'}
      </h2>
      <p className="text-gray-600 mb-8">
        {language === 'en' ? 'How would you like to use DigitalSewa?' : 'तपाईं डिजिटलसेवा कसरी प्रयोग गर्न चाहनुहुन्छ?'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedPortal('client')}
          className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
        >
          <ProjectsIcon className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-bold text-gray-800">{language === 'en' ? "I'm a Client" : 'म एक ग्राहक हुँ'}</h3>
          <p className="text-sm text-gray-500">{language === 'en' ? 'Hiring for a project' : 'परियोजनाको लागि काममा लगाउँदै'}</p>
        </button>
        <button
          onClick={() => setSelectedPortal('freelancer')}
          className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
        >
          <FreelancersIcon className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-bold text-gray-800">{language === 'en' ? "I'm a Freelancer" : 'म एक स्वतन्त्रकर्ता हुँ'}</h3>
          <p className="text-sm text-gray-500">{language === 'en' ? 'Looking for work' : 'काम खोजदै छु'}</p>
        </button>
      </div>
    </div>
  );

  const SignupForm = () => {
    const config = portalConfig[selectedPortal!];

    return (
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <LogoWordmark size="lg" />
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-800">{config.title[language]}</h2>
          <p className="text-gray-600">{config.subtitle[language]}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              {language === 'en' ? 'Full Name' : 'पूरा नाम'}
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              id="name"
              name="name"
              type="text"
              placeholder={language === 'en' ? 'e.g. Sita Sharma' : 'उदाहरण: सीता शर्मा'}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {language === 'en' ? 'Email' : 'इमेल'}
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {language === 'en' ? 'Password' : 'पासवर्ड'}
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              id="password"
              name="password"
              type="password"
              placeholder="************"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordStrengthIndicator password={formData.password} language={language} />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              {language === 'en' ? 'Confirm Password' : 'पासवर्ड पुष्टि गर्नुहोस्'}
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder:text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="************"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <span className="ml-2 text-gray-700 text-sm">
                {language === 'en' ? 'I agree to the' : 'म सहमत छु'}
                <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 hover:underline">
                  {' '}
                  {language === 'en' ? 'Terms of Service' : 'सेवाका सर्तहरू'}
                </a>{' '}
                &
                <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 hover:underline">
                  {' '}
                  {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                </a>
              </span>
            </label>
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={!agreed || loading}
          >
            {loading
              ? language === 'en'
                ? 'Creating...'
                : 'सिर्जना हुँदैछ...'
              : language === 'en'
              ? 'Create Account'
              : 'खाता बनाउनुहोस्'}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            {language === 'en' ? 'Already have an account?' : 'पहिले नै खाता छ?'}{' '}
            <Link href={`/login?portal=${selectedPortal}`} className="font-bold text-green-500 hover:text-green-800">
              {language === 'en' ? 'Log In' : 'लग - इन'}
            </Link>
          </p>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-4 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <GlobeIcon className="w-6 h-6 text-gray-600" />
          <span className="font-semibold text-gray-700">{language === 'en' ? 'EN' : 'ने'}</span>
        </button>
      </div>
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 font-semibold"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span>{language === 'en' ? 'Back' : 'पछाडि'}</span>
        </button>
      </div>

      {selectedPortal ? <SignupForm /> : <PortalSelector />}
    </div>
  );
}
