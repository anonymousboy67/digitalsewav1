
import React from 'react';
import type { Language, Freelancer } from '../types';
import FreelancerCard from './FreelancerCard';

interface TopFreelancersProps {
  language: Language;
  freelancers: Freelancer[];
  clientProjectSkills?: Set<string>;
  onViewProfile?: (freelancer: Freelancer) => void;
}

const TopFreelancers: React.FC<TopFreelancersProps> = ({ language, freelancers, clientProjectSkills, onViewProfile }) => {
  // Show only top 4 freelancers on home page
  const topFreelancers = freelancers.slice(0, 4);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Top Freelancers' : 'शीर्ष स्वतन्त्रकर्ताहरू'}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {topFreelancers.map(freelancer => (
          <FreelancerCard 
            key={freelancer.id} 
            freelancer={freelancer} 
            language={language}
            clientProjectSkills={clientProjectSkills}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </section>
  );
};

export default TopFreelancers;
