
import React, { useState, useMemo } from 'react';
import type { Language, Freelancer } from '../types';
import { CurrencyRupeeIcon, BriefcaseIcon, StarIcon, EyeIcon, EyeOffIcon } from './icons';

interface FreelancerStatsProps {
  language: Language;
  currentUser: Freelancer;
}

const StatCard: React.FC<{
    value: string;
    label: string;
    Icon: React.FC<{ className?: string }>;
    isSensitive?: boolean;
}> = ({ value, label, Icon, isSensitive = false }) => {
    const [isVisible, setIsVisible] = useState(!isSensitive);

    const toggleVisibility = () => {
        if (isSensitive) {
            setIsVisible(prev => !prev);
        }
    };

    const displayValue = isSensitive && !isVisible ? 'Rs. *********' : value;
    
    return (
        <div className="relative bg-white h-full p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 text-center sm:text-left">
            {isSensitive && (
                <button
                    onClick={toggleVisibility}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                    aria-label={isVisible ? 'Hide amount' : 'Show amount'}
                >
                    {isVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            )}
            <div className="bg-green-100 p-3 rounded-full mb-3 sm:mb-0 flex-shrink-0">
                <Icon className="w-7 h-7 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">{displayValue}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
            </div>
        </div>
    );
};

const FreelancerStats: React.FC<FreelancerStatsProps> = ({ language, currentUser }) => {
  const calculatedStats = useMemo(() => {
    const history = currentUser.completedJobsHistory || [];
    const lifetimeEarnings = history.reduce((sum, job) => sum + job.budget, 0);
    const jobsCompleted = history.length;
    const totalRating = history.reduce((sum, job) => sum + job.clientRating, 0);
    const currentRating = jobsCompleted > 0 ? (totalRating / jobsCompleted).toFixed(1) : '0.0';
    return { lifetimeEarnings, jobsCompleted, currentRating };
  }, [currentUser]);
  
  const stats = [
    {
      id: 'earnings',
      value: `Rs. ${(calculatedStats.lifetimeEarnings).toLocaleString()}`,
      label: { en: 'Lifetime Earnings', np: 'कुल आम्दानी' },
      icon: CurrencyRupeeIcon,
    },
    {
      id: 'jobs',
      value: calculatedStats.jobsCompleted.toString(),
      label: { en: 'Jobs Completed', np: 'सम्पन्न कामहरू' },
      icon: BriefcaseIcon,
    },
    {
      id: 'rating',
      value: calculatedStats.currentRating,
      label: { en: 'Current Rating', np: 'वर्तमान मूल्याङ्कन' },
      icon: StarIcon,
    },
    {
      id: 'views',
      value: '2.1k', // This value is not in history data, kept static
      label: { en: 'Profile Views', np: 'प्रोफाइल अवलोकन' },
      icon: EyeIcon,
    },
  ];

  const lifetimeEarning = stats[0];
  const otherStats = stats.slice(1);

  return (
    <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="sm:col-span-2 lg:col-span-3">
                <StatCard value={lifetimeEarning.value} label={lifetimeEarning.label[language]} Icon={lifetimeEarning.icon} isSensitive />
            </div>
            {otherStats.map((stat) => (
                <StatCard key={stat.id} value={stat.value} label={stat.label[language]} Icon={stat.icon} />
            ))}
        </div>
    </section>
  );
};

export default FreelancerStats;