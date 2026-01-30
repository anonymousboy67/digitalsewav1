
import React from 'react';
import type { Language, Freelancer, Client } from '../types';
import { VerifiedIcon } from './icons';
import { calculateFreelancerXp, calculateClientXp, calculateLevelInfo } from '../utils/levelingSystem';

interface UserProfileCardProps {
  language: Language;
  user: Freelancer | Client;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ language, user }) => {
    const isFreelancer = 'completedJobsHistory' in user;

    const { level, levelName, progress } = React.useMemo(() => {
        let xp = 0;
        if (isFreelancer) {
            xp = calculateFreelancerXp(user.completedJobsHistory);
        } else {
            xp = calculateClientXp(user.postedJobsHistory);
        }
        return calculateLevelInfo(xp);
    }, [user, isFreelancer]);


    const progressText = language === 'en' 
        ? `${progress}% to next level` 
        : `अर्को स्तरमा ${progress}%`;
        
    const levelDisplayText = language === 'en'
        ? `Level ${level} - ${levelName.en}`
        : `स्तर ${level.toLocaleString('ne-NP')} - ${levelName.np}`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <img 
                src={user.avatarUrl} 
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md"
            />
            <div className="flex items-center justify-center gap-2 mt-4">
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                {isFreelancer && user.isVerified && <VerifiedIcon className="w-5 h-5 text-green-600" />}
            </div>
            
            {isFreelancer && <p className="text-sm text-gray-500">{user.title[language]}</p>}

            <div className="mt-6 text-left">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-green-600">{levelDisplayText}</span>
                    <span className="text-xs text-gray-500">{progressText}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;