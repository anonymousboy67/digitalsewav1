
import React, { useState, useMemo } from 'react';
import type { Language, Client } from '../types';
import { BriefcaseIcon, ClockIcon, CurrencyRupeeIcon, UsersIcon, EyeIcon, EyeOffIcon } from './icons';

interface ClientStatsProps {
  language: Language;
  currentUser: Client;
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

const ClientStats: React.FC<ClientStatsProps> = ({ language, currentUser }) => {
  const calculatedStats = useMemo(() => {
    const totalSpent = currentUser.postedJobsHistory.reduce((sum, job) => sum + job.budget, 0);
    const projectsPosted = currentUser.postedJobsHistory.length;
    return { totalSpent, projectsPosted };
  }, [currentUser]);

  const stats = [
    {
      id: 'projects',
      value: calculatedStats.projectsPosted.toString(),
      label: { en: 'Total Projects Posted', np: 'कुल पोस्ट गरिएका परियोजनाहरू' },
      icon: BriefcaseIcon,
    },
    {
      id: 'gigs',
      value: '3', // This value is not in history data, kept static
      label: { en: 'Active Gigs', np: 'सक्रिय गिगहरू' },
      icon: ClockIcon,
    },
    {
      id: 'spent',
      value: `Rs. ${ (calculatedStats.totalSpent).toLocaleString() }`,
      label: { en: 'Total Spent', np: 'कुल खर्च' },
      icon: CurrencyRupeeIcon,
    },
    {
      id: 'hired',
      value: calculatedStats.projectsPosted.toString(), // Assuming one freelancer per project
      label: { en: 'Freelancers Hired', np: 'काममा लगाइएका स्वतन्त्रकर्ताहरू' },
      icon: UsersIcon,
    },
  ];
  
  const totalSpentStat = stats.find(s => s.id === 'spent');
  const otherStats = stats.filter(s => s.id !== 'spent');


  return (
    <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {totalSpentStat && (
             <div className="sm:col-span-2 lg:col-span-3">
              <StatCard value={totalSpentStat.value} label={totalSpentStat.label[language]} Icon={totalSpentStat.icon} isSensitive />
            </div>
          )}
          {otherStats.map((stat) => (
            <StatCard key={stat.id} value={stat.value} label={stat.label[language]} Icon={stat.icon} />
          ))}
        </div>
    </section>
  );
};

export default ClientStats;