
import React from 'react';
import type { Language } from '../types';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './icons';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
        href={href}
        onClick={(e) => { e.preventDefault(); alert(`Navigating to ${children}...`); }}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base text-gray-300 hover:text-white"
    >
        {children}
    </a>
);

const SocialLink: React.FC<{ name: string; href: string; children: React.ReactNode }> = ({ name, href, children }) => (
     <a 
        href={href}
        onClick={(e) => { e.preventDefault(); alert(`Navigating to our ${name} page!`); }}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-300"
    >
        <span className="sr-only">{name}</span>
        {children}
    </a>
);

const Footer: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{language === 'en' ? 'Solutions' : 'समाधानहरू'}</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#">{language === 'en' ? 'Find Work' : 'काम खोज्नुहोस्'}</FooterLink></li>
              <li><FooterLink href="#">{language === 'en' ? 'Find Talent' : 'प्रतिभा खोज्नुहोस्'}</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{language === 'en' ? 'Company' : 'कम्पनी'}</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#">{language === 'en' ? 'About' : 'बारेमा'}</FooterLink></li>
              <li><FooterLink href="#">{language === 'en' ? 'Blog' : 'ब्लग'}</FooterLink></li>
              <li><FooterLink href="#">{language === 'en' ? 'Careers' : 'क्यारियर'}</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{language === 'en' ? 'Support' : 'समर्थन'}</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#">{language === 'en' ? 'Help Center' : 'सहयोग केन्द्र'}</FooterLink></li>
              <li><FooterLink href="#">{language === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}</FooterLink></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{language === 'en' ? 'Legal' : 'कानूनी'}</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink href="#">{language === 'en' ? 'Privacy' : 'गोपनीयता'}</FooterLink></li>
              <li><FooterLink href="#">{language === 'en' ? 'Terms' : 'सर्तहरू'}</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} kaamgarau. {language === 'en' ? 'All rights reserved.' : 'सबै अधिकार सुरक्षित।'}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
             <SocialLink name="Facebook" href="#"><FacebookIcon className="h-6 w-6" /></SocialLink>
             <SocialLink name="Twitter" href="#"><TwitterIcon className="h-6 w-6" /></SocialLink>
             <SocialLink name="LinkedIn" href="#"><LinkedInIcon className="h-6 w-6" /></SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
