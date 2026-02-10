
import React from 'react';
import type { Language } from '../types';
import { ArrowLeftIcon } from '../components/icons';

interface PostProjectPageProps {
    language: Language;
    onBack: () => void;
}

const PostProjectPage: React.FC<PostProjectPageProps> = ({ language, onBack }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(language === 'en' ? 'Project posted successfully! (Simulation)' : 'परियोजना सफलतापूर्वक पोस्ट गरियो! (सिमुलेशन)');
        onBack();
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-gray-800">
                    {language === 'en' ? 'Post a New Project' : 'नयाँ परियोजना पोस्ट गर्नुहोस्'}
                </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Project Title (English)' : 'परियोजना शीर्षक (अंग्रेजी)'}</label>
                        <input type="text" id="title_en" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="title_np" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Project Title (Nepali)' : 'परियोजना शीर्षक (नेपाली)'}</label>
                        <input type="text" id="title_np" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Budget (in Rs.)' : 'बजेट (रु.)'}</label>
                        <input type="number" id="budget" placeholder="e.g., 25000" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Deadline' : 'म्याद'}</label>
                        <input type="text" id="deadline" placeholder={language === 'en' ? 'e.g., 2 Weeks' : 'उदाहरण: २ हप्ता'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                    </div>
                </div>
                
                 <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Skills Required (comma separated)' : 'आवश्यक सीपहरू (अल्पविरामद्वारा छुट्याइएको)'}</label>
                    <input type="text" id="skills" placeholder="e.g., UI/UX, Figma, Web Design" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                
                <div className="flex items-center">
                    <input id="is_urgent" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    <label htmlFor="is_urgent" className="ml-2 block text-sm text-gray-900">{language === 'en' ? 'This is an urgent project' : 'यो एक तत्काल परियोजना हो'}</label>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors mr-4">
                        {language === 'en' ? 'Cancel' : 'रद्द गर्नुहोस्'}
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                        {language === 'en' ? 'Post Project' : 'परियोजना पोस्ट गर्नुहोस्'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostProjectPage;
