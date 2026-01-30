
import React, { useMemo } from 'react';
import type { Language, Project, Freelancer, ProjectStatus } from '../types';
import { ArrowLeftIcon, ClockIcon, CurrencyRupeeIcon, BriefcaseIcon } from '../components/icons';
import FreelancerCard from '../components/FreelancerCard';

interface ProjectDetailsPageProps {
    language: Language;
    project: Project;
    freelancers: Freelancer[];
    clientProjectSkills: Set<string>;
    onBack: () => void;
    onViewProfile: (freelancer: Freelancer) => void;
}

const statusStyles: Record<ProjectStatus, { text: { en: string; np: string }, classes: string }> = {
    Open: { text: { en: 'Open', np: 'खुला' }, classes: 'bg-green-100 text-green-800' },
    'In Progress': { text: { en: 'In Progress', np: 'प्रगतिमा' }, classes: 'bg-blue-100 text-blue-800' },
    Completed: { text: { en: 'Completed', np: 'सम्पन्न' }, classes: 'bg-purple-100 text-purple-800' }
};

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ language, project, freelancers, onBack, clientProjectSkills, onViewProfile }) => {
    
    if (!project) {
        onBack();
        return null;
    }

    const statusInfo = statusStyles[project.status];

    const relevantFreelancers = useMemo(() => {
        const projectSkills = new Set(project.skills || []);
        return freelancers.filter(f => (f.skills || []).some(skill => projectSkills.has(skill)));
    }, [project.skills, freelancers]);

    return (
        <div className="animate-fade-in">
             <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 font-semibold mb-6 hover:text-gray-900">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>{language === 'en' ? 'Back to Projects' : 'परियोजनाहरूमा फर्कनुहोस्'}</span>
            </button>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Project Info */}
                    <div className="lg:w-2/3 space-y-6">
                        <header>
                             <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusInfo?.classes}`}>
                                    {statusInfo?.text?.[language]}
                                </span>
                                 {project.isUrgent && (
                                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                                        {language === 'en' ? 'Urgent' : 'तत्काल'}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                {project.title?.[language]}
                            </h1>
                        </header>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <CurrencyRupeeIcon className="w-7 h-7 mx-auto text-green-600 mb-1" />
                                <p className="text-sm text-gray-500">{language === 'en' ? 'Budget' : 'बजेट'}</p>
                                <p className="font-bold text-gray-800">Rs. {(project.budget || 0).toLocaleString()}</p>
                            </div>
                             <div className="bg-slate-50 p-4 rounded-lg">
                                <ClockIcon className="w-7 h-7 mx-auto text-green-600 mb-1" />
                                <p className="text-sm text-gray-500">{language === 'en' ? 'Deadline' : 'म्याद'}</p>
                                <p className="font-bold text-gray-800">{project.deadline}</p>
                            </div>
                             <div className="bg-slate-50 p-4 rounded-lg">
                                <BriefcaseIcon className="w-7 h-7 mx-auto text-green-600 mb-1" />
                                <p className="text-sm text-gray-500">{language === 'en' ? 'Location' : 'स्थान'}</p>
                                <p className="font-bold text-gray-800">{project.location}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{language === 'en' ? 'Project Description' : 'परियोजना विवरण'}</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{project.description?.[language]}</p>
                        </div>
                         <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">{language === 'en' ? 'Skills Required' : 'आवश्यक सीपहरू'}</h2>
                            <div className="flex flex-wrap gap-2">
                                {(project.skills || []).map(skill => (
                                    <span key={skill} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full">
                                    {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                             <button className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg">
                                {language === 'en' ? 'Bid Now' : 'बोली लगाउनुहोस्'}
                            </button>
                        </div>
                    </div>

                    {/* Relevant Freelancers Sidebar */}
                    <div className="lg:w-1/3 bg-slate-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{language === 'en' ? 'Relevant Freelancers' : 'सम्बन्धित स्वतन्त्रकर्ताहरू'}</h3>
                        {relevantFreelancers.length > 0 ? (
                            <div className="space-y-4">
                                {relevantFreelancers.slice(0, 4).map(freelancer => (
                                    <FreelancerCard 
                                        key={freelancer.id}
                                        freelancer={freelancer}
                                        language={language}
                                        clientProjectSkills={clientProjectSkills}
                                        onViewProfile={onViewProfile}
                                    />
                                ))}
                            </div>
                        ) : (
                             <p className="text-gray-500 text-sm">{language === 'en' ? 'No specific freelancers match this project\'s skills.' : 'यो परियोजनाको सीपसँग कुनै विशेष स्वतन्त्रकर्ता मेल खाँदैन।'}</p>
                        )}
                         <button onClick={() => alert("Navigating to all freelancers page...")} className="mt-6 w-full text-center text-green-600 font-semibold hover:underline">
                            {language === 'en' ? 'View All Freelancers' : 'सबै स्वतन्त्रकर्ताहरू हेर्नुहोस्'} &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
