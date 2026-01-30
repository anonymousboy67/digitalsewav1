
import React, { useMemo } from 'react';
import type { Language, Freelancer } from '../types';
import { VerifiedIcon, StarIcon } from './icons';

interface FreelancerCardProps {
  freelancer: Freelancer;
  language: Language;
  clientProjectSkills?: Set<string>;
  onViewProfile?: (freelancer: Freelancer) => void;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, language, clientProjectSkills, onViewProfile }) => {
  if (!freelancer) {
    return null;
  }

  const hasMatchingSkill = useMemo(() => {
    if (!clientProjectSkills || clientProjectSkills.size === 0) return false;
    return freelancer.skills.some(skill => clientProjectSkills.has(skill));
  }, [freelancer.skills, clientProjectSkills]);

  const averageRating = useMemo(() => {
    if (!freelancer.completedJobsHistory || freelancer.completedJobsHistory.length === 0) {
      return 0;
    }
    const totalRating = freelancer.completedJobsHistory.reduce((sum, job) => sum + job.clientRating, 0);
    return (totalRating / freelancer.completedJobsHistory.length).toFixed(1);
  }, [freelancer.completedJobsHistory]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative flex-shrink-0">
        <img className="w-16 h-16 rounded-full object-cover" src={freelancer.avatarUrl} alt={freelancer.name} />
        {freelancer.isOnline && (
          <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-white"></span>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-lg text-gray-800">{freelancer.name}</h3>
          {freelancer.isVerified && <VerifiedIcon className="w-5 h-5 text-green-600" />}
        </div>
        <p className="text-sm text-gray-500">{freelancer?.title?.[language] || (language === 'en' ? 'No Title' : 'कुनै शीर्षक छैन')}</p>
        
        {hasMatchingSkill && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-green-700 font-semibold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{language === 'en' ? 'Matches Your Project' : 'तपाईंको परियोजनासँग मेल खान्छ'}</span>
            </div>
        )}

        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-500 mr-1"/>
            <span>{averageRating}</span>
          </div>
          <span>{freelancer.completedJobsHistory.length}+ {language === 'en' ? 'jobs' : 'काम'}</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-green-600">Rs. {freelancer.hourlyRate}/hr</p>
        <button 
            onClick={() => onViewProfile ? onViewProfile(freelancer) : alert(`Viewing profile for ${freelancer.name}`)}
            className="mt-2 text-sm text-green-600 font-semibold hover:underline"
        >
            {language === 'en' ? 'View Profile' : 'प्रोफाइल हेर्नुहोस्'}
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;