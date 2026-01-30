
import React from 'react';
import { GlobeIcon, SearchIcon, LogoutIcon } from './icons';
import type { Language } from '../types';
import LogoWordmark from './LogoWordmark';

interface HeaderProps {
  language: Language;
  toggleLanguage: () => void;
  onLogout?: () => void;
  activeTab: string;
  onTabClick: (tabId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  portal: 'freelancer' | 'client' | null;
}

const NavLink: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            {label}
        </button>
    );
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage, onLogout, activeTab, onTabClick, searchQuery, onSearchChange, onSearchSubmit, portal }) => {
    
    const freelancerNavItems = [
        { id: 'home', label: { en: 'Home', np: 'गृह' } },
        { id: 'projects', label: { en: 'Find Work', np: 'काम खोज्नुहोस्' } },
        { id: 'contracts', label: { en: 'My Contracts', np: 'मेरा अनुबंधहरू' } },
        { id: 'messages', label: { en: 'Messages', np: 'सन्देश' } },
        { id: 'profile', label: { en: 'Profile', np: 'प्रोफाइल' } },
    ];
    
    const clientNavItems = [
        { id: 'home', label: { en: 'Home', np: 'गृह' } },
        { id: 'manageProjects', label: { en: 'My Projects', np: 'मेरा परियोजनाहरू' } },
        { id: 'freelancers', label: { en: 'Find Talent', np: 'प्रतिभा खोज्नुहोस्' } },
        { id: 'messages', label: { en: 'Messages', np: 'सन्देश' } },
        { id: 'profile', label: { en: 'Profile', np: 'प्रोफाइल' } },
    ];
    
    const navItems = portal === 'client' ? clientNavItems : freelancerNavItems;

    const searchPlaceholder = { 
        en: 'Search projects, freelancers, skills...', 
        np: 'परियोजना, स्वतन्त्रकर्ता, सीपहरू खोज्नुहोस्...' 
    };
  
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearchSubmit(searchQuery);
        }
    };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-8">
                <button onClick={() => onTabClick('home')} aria-label="Go to homepage">
                    <LogoWordmark size="sm" />
                </button>
                <nav className="hidden md:flex items-center space-x-2">
                    {navItems.map(item => (
                        <NavLink 
                            key={item.id}
                            label={item.label[language]}
                            isActive={activeTab === item.id}
                            onClick={() => onTabClick(item.id)}
                        />
                    ))}
                </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
                 <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder={searchPlaceholder[language]}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2" aria-label="Submit search">
                      <SearchIcon className="w-4 h-4 text-gray-400" />
                    </button>
                </form>
                <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <GlobeIcon className="w-6 h-6 text-gray-600" />
                </button>
                {onLogout && (
                    <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Logout">
                        <LogoutIcon className="w-6 h-6 text-red-500" />
                    </button>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
