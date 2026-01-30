
import React from 'react';
import type { Language } from '../types';
import { HomeIcon, ProjectsIcon, FreelancersIcon, MessagesIcon, ProfileIcon, BriefcaseIcon } from './icons';

interface BottomNavProps {
    language: Language;
    activeTab: string;
    onTabClick: (tabId: string) => void;
    portal: 'freelancer' | 'client' | null;
}

const BottomNavItem: React.FC<{
    item: { id: string; label: { en: string; np: string; }; icon: React.FC<{className?: string}> };
    isActive: boolean;
    onClick: () => void;
    language: Language;
}> = ({ item, isActive, onClick, language }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
            }`}
        >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label[language]}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ language, activeTab, onTabClick, portal }) => {

    const freelancerNavItems = [
        { id: 'home', label: { en: 'Home', np: 'गृह' }, icon: HomeIcon },
        { id: 'projects', label: { en: 'Find Work', np: 'काम' }, icon: ProjectsIcon },
        { id: 'contracts', label: { en: 'Contracts', np: 'अनुबंध' }, icon: BriefcaseIcon },
        { id: 'messages', label: { en: 'Messages', np: 'सन्देश' }, icon: MessagesIcon },
        { id: 'profile', label: { en: 'Profile', np: 'प्रोफाइल' }, icon: ProfileIcon },
    ];

    const clientNavItems = [
        { id: 'home', label: { en: 'Home', np: 'गृह' }, icon: HomeIcon },
        { id: 'manageProjects', label: { en: 'Projects', np: 'परियोजना' }, icon: ProjectsIcon },
        { id: 'freelancers', label: { en: 'Talent', np: 'प्रतिभा' }, icon: FreelancersIcon },
        { id: 'messages', label: { en: 'Messages', np: 'सन्देश' }, icon: MessagesIcon },
        { id: 'profile', label: { en: 'Profile', np: 'प्रोफाइल' }, icon: ProfileIcon },
    ];

    const navItems = portal === 'client' ? clientNavItems : freelancerNavItems;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 flex justify-around items-center z-20">
            {navItems.map(item => (
                <BottomNavItem
                    key={item.id}
                    item={item}
                    isActive={activeTab === item.id}
                    onClick={() => onTabClick(item.id)}
                    language={language}
                />
            ))}
        </nav>
    );
};

export default BottomNav;