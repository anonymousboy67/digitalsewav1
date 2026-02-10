
import React, { useState, useMemo } from 'react';
import type { Language, Freelancer } from '../types';
import FreelancerCard from '../components/FreelancerCard';
import { SearchIcon } from '../components/icons';

interface FreelancersPageProps {
    language: Language;
    freelancers: Freelancer[];
    clientProjectSkills?: Set<string>;
    onViewProfile: (freelancer: Freelancer) => void;
}

const FreelancersPage: React.FC<FreelancersPageProps> = ({ language, freelancers, clientProjectSkills, onViewProfile }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFreelancers = useMemo(() => {
        if (!searchQuery) {
            return freelancers;
        }
        const query = searchQuery.toLowerCase();
        return freelancers.filter(freelancer =>
            (freelancer?.name || '').toLowerCase().includes(query) ||
            (freelancer?.title?.[language] || '').toLowerCase().includes(query)
        );
    }, [searchQuery, language, freelancers]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    {language === 'en' ? 'Find Talent' : 'प्रतिभा खोज्नुहोस्'}
                </h1>
                <p className="mt-1 text-gray-500">
                    {language === 'en' ? `Showing ${filteredFreelancers.length} professionals.` : `${filteredFreelancers.length} पेशेवरहरू देखाइँदै।`}
                </p>
            </div>
            
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'Search by name or title...' : 'नाम वा शीर्षक द्वारा खोज्नुहोस्...'}
                    className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredFreelancers.map(freelancer => (
                    <FreelancerCard 
                        key={freelancer.id} 
                        freelancer={freelancer} 
                        language={language} 
                        clientProjectSkills={clientProjectSkills}
                        onViewProfile={onViewProfile}
                    />
                ))}
            </div>
        </div>
    );
};

export default FreelancersPage;
