
import React, { useMemo } from 'react';
import type { Language, Project, Freelancer } from '../types';
import QuickActions from '../components/QuickActions';
import ProjectCard from '../components/ProjectCard';
import FreelancerStats from '../components/FreelancerStats';
import UserProfileCard from '../components/UserProfileCard';

interface FreelancerDashboardProps {
    language: Language;
    portal: 'freelancer' | 'client' | null;
    onNavigate: (tab: string) => void;
    projects: Project[];
    currentUser: Freelancer; // Pass in the current freelancer
    onViewProject: (project: Project) => void;
    savedProjects: Set<string>;
    onToggleSaveProject: (projectId: string) => void;
}

const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({ 
    language, 
    portal, 
    onNavigate, 
    projects,
    currentUser,
    onViewProject,
    savedProjects,
    onToggleSaveProject
}) => {

    const recommendedProjects = useMemo(() => {
        const freelancerSkills = new Set(currentUser.skills);
        // Find projects that have at least one matching skill and are 'Open'
        return projects
            .filter(p => p.status === 'Open' && p.skills.some(skill => freelancerSkills.has(skill)))
            .slice(0, 3); // Show top 3 recommendations
    }, [projects, currentUser]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <main className="lg:col-span-2 space-y-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {language === 'en' ? `Welcome back, ${currentUser.name.split(' ')[0]}!` : `${currentUser.name.split(' ')[0]}, फेरि स्वागत छ!`}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {language === 'en' 
                            ? 'Here\'s a snapshot of your activity and opportunities.' 
                            : 'यहाँ तपाईंको गतिविधि र अवसरहरूको एक झलक छ।'}
                    </p>
                </div>

                <FreelancerStats language={language} currentUser={currentUser} />

                <QuickActions language={language} portal={portal} onNavigate={onNavigate} />

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Recommended For You' : 'तपाईंको लागि सिफारिस गरिएको'}</h2>
                    {recommendedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {recommendedProjects.map(project => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                language={language} 
                                onViewDetails={() => onViewProject(project)}
                                isSaved={savedProjects.has(project.id)}
                                onSave={() => onToggleSaveProject(project.id)}
                            />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <p className="text-gray-500">{language === 'en' ? 'No new project recommendations right now. Check back later!' : 'अहिले कुनै नयाँ परियोजना सिफारिसहरू छैनन्। पछि फेरि जाँच गर्नुहोस्!'}</p>
                        </div>
                    )}
                    <div className="mt-6 text-center">
                        <button onClick={() => onNavigate('projects')} className="font-semibold text-green-600 hover:underline">
                            {language === 'en' ? 'View all projects' : 'सबै परियोजनाहरू हेर्नुहोस्'} &rarr;
                        </button>
                    </div>
                </section>
            </main>
            <aside className="lg:col-span-1 lg:sticky lg:top-24 space-y-8">
                 <UserProfileCard language={language} user={currentUser} />
            </aside>
        </div>
    );
};

export default FreelancerDashboard;