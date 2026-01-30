
import React from 'react';
import type { Language, Category } from '../types';
import { DesignIcon, CodeIcon, WritingIcon, MarketingIcon, VideoIcon, MusicIcon } from './icons';

interface CategoriesProps {
  language: Language;
}

const categoriesData: Category[] = [
  { id: 'design', name: { en: 'Design', np: 'डिजाइन' }, icon: DesignIcon },
  { id: 'dev', name: { en: 'Development', np: 'विकास' }, icon: CodeIcon },
  { id: 'writing', name: { en: 'Writing', np: 'लेखन' }, icon: WritingIcon },
  { id: 'marketing', name: { en: 'Marketing', np: 'मार्केटिङ' }, icon: MarketingIcon },
  { id: 'video', name: { en: 'Video', np: 'भिडियो' }, icon: VideoIcon },
  { id: 'audio', name: { en: 'Audio', np: 'अडियो' }, icon: MusicIcon },
];

const CategoryItem: React.FC<{ category: Category; language: Language }> = ({ category, language }) => (
  <div className="flex flex-col items-center justify-center space-y-2 flex-shrink-0 w-28 text-center cursor-pointer group">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
      <category.icon className="w-9 h-9" />
    </div>
    <p className="text-sm text-center text-gray-700 font-medium group-hover:text-green-600 transition-colors">{category.name[language]}</p>
  </div>
);

const Categories: React.FC<CategoriesProps> = ({ language }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Explore Categories' : 'श्रेणीहरू अन्वेषण गर्नुहोस्'}</h2>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
        {categoriesData.map(cat => (
          <CategoryItem key={cat.id} category={cat} language={language} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
