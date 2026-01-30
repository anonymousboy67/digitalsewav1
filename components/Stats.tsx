
import React from 'react';
import type { Language } from '../types';

interface StatsProps {
  language: Language;
}

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl text-center shadow-sm">
    <p className="text-3xl font-bold text-green-600">{value}</p>
    <p className="text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

const Stats: React.FC<StatsProps> = ({ language }) => {
  const stats = [
    {
      value: '5,000+',
      label: { en: 'Active Projects', np: 'सक्रिय परियोजनाहरू' },
    },
    {
      value: '20,000+',
      label: { en: 'Total Freelancers', np: 'कुल स्वतन्त्रकर्ताहरू' },
    },
    {
      value: '15,000+',
      label: { en: 'Completed Jobs', np: 'सम्पन्न कामहरू' },
    },
  ];

  return (
    <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{language === 'en' ? 'Our Marketplace at a Glance' : 'हाम्रो बजार एक नजरमा'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label[language]} />
          ))}
        </div>
    </section>
  );
};

export default Stats;
