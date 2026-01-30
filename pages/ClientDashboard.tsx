
import React from 'react';
import type { Language, Project, Freelancer, Client, ProjectStatus } from '../types';
import { PlusIcon } from '../components/icons';
import QuickActions from '../components/QuickActions';
import ClientStats from '../components/ClientStats';
import ProjectAnalytics from '../components/ProjectAnalytics';
import TopFreelancers from '../components/TopFreelancers';
import ProjectCard from '../components/ProjectCard';
import UserProfileCard from '../components/UserProfileCard';

interface ClientDashboardProps {
    language: Language;
    onNavigate: (view: string) => void;
    currentUser: Client;
    myProjects: Project[]; // Client's own projects
    allFreelancers: Freelancer[];
    clientProjectSkills: Set<string>;
    onViewProfile: (freelancer: Freelancer) => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: string) => void;
    onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ 
    language, 
    onNavigate, 
    currentUser,
    myProjects,
    allFreelancers,
    clientProjectSkills,
    onViewProfile,
    onEditProject,
    onDeleteProject,
    onStatusChange
}) => {
    
    const handleDelete = (projectId: string) => {
        const confirmationText = language === 'en' 
            ? 'Are you sure you want to delete this project? This action cannot be undone.'
            : 'के तपाईं यो परियोजना मेटाउन निश्चित हुनुहुन्छ? यो कार्यलाई उल्टाउन सकिँदैन।';
        if (window.confirm(confirmationText)) {
            onDeleteProject(projectId);
        }
    };

    return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <main className="lg:col-span-2 space-y-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {language === 'en' ? 'Welcome to Your Dashboard' : 'तपाईंको ड्यासबोर्डमा स्वागत छ'}
                            </h1>
                            <p className="text-gray-600 mt-1 max-w-lg">
                                {language === 'en' 
                                    ? 'Manage projects, hire talent, and track progress all in one place.' 
                                    : 'परियोजनाहरू व्यवस्थापन गर्नुहोस्, प्रतिभा भर्ना गर्नुहोस्, र प्रगति एकै ठाउँमा ट्र्याक गर्नुहोस्।'}
                            </p>
                        </div>
                        <button 
                            onClick={() => onNavigate('postProject')}
                            className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>{language === 'en' ? 'Post a New Project' : 'नयाँ परियोजना पोस्ट गर्नुहोस्'}</span>
                        </button>
                    </div>
                </div>

                <ClientStats language={language} currentUser={currentUser} />

                <ProjectAnalytics language={language} />
                
                <QuickActions language={language} portal="client" onNavigate={onNavigate} />

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'My Recent Projects' : 'मेरा हालका परियोजनाहरू'}</h2>
                    {myProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {myProjects.slice(0, 2).map(project => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    language={language}
                                    onEdit={() => onEditProject(project)}
                                    onDelete={() => handleDelete(project.id)}
                                    onStatusChange={(newStatus) => onStatusChange(project.id, newStatus)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500">{language === 'en' ? 'You have no active projects.' : 'तपाईंसँग कुनै सक्रिय परियोजनाहरू छैनन्।'}</p>
                        </div>
                    )}
                    <div className="mt-6 text-center">
                        <button onClick={() => onNavigate('manageProjects')} className="font-semibold text-green-600 hover:underline">
                            {language === 'en' ? 'Manage all my projects' : 'मेरा सबै परियोजनाहरू व्यवस्थापन गर्नुहोस्'} &rarr;
                        </button>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Recommended Freelancers' : 'सिफारिस गरिएका स्वतन्त्रकर्ताहरू'}</h2>
                    <TopFreelancers 
                        language={language}
                        freelancers={allFreelancers}
                        clientProjectSkills={clientProjectSkills}
                        onViewProfile={onViewProfile}
                    />
                    <div className="mt-6 text-center">
                        <button onClick={() => onNavigate('freelancers')} className="font-semibold text-green-600 hover:underline">
                            {language === 'en' ? 'Find more freelancers' : 'थप स्वतन्त्रकर्ताहरू खोज्नुहोस्'} &rarr;
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

export default ClientDashboard;
