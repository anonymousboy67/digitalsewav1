
import React from 'react';
import type { Language, Project, ProjectStatus } from '../types';
import { ArrowLeftIcon } from '../components/icons';
import ProjectCard from '../components/ProjectCard';

interface ManageProjectsPageProps {
    language: Language;
    myProjects: Project[];
    onBack: () => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: string) => void;
    onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
}

const ManageProjectsPage: React.FC<ManageProjectsPageProps> = ({ language, myProjects, onBack, onEditProject, onDeleteProject, onStatusChange }) => {
    
    const handleDelete = (projectId: string) => {
        const confirmationText = language === 'en' 
            ? 'Are you sure you want to delete this project? This action cannot be undone.'
            : 'के तपाईं यो परियोजना मेटाउन निश्चित हुनुहुन्छ? यो कार्यलाई उल्टाउन सकिँदैन।';
        if (window.confirm(confirmationText)) {
            onDeleteProject(projectId);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
            <div className="flex items-center mb-6">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {language === 'en' ? 'Manage My Projects' : 'मेरा परियोजनाहरू व्यवस्थापन गर्नुहोस्'}
                    </h1>
                    <p className="mt-1 text-gray-500">
                        {language === 'en' ? `You have ${myProjects.length} active projects.` : `तपाईंसँग ${myProjects.length} सक्रिय परियोजनाहरू छन्।`}
                    </p>
                </div>
            </div>
            
            {myProjects.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {myProjects.map(project => (
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

             <div className="flex justify-start pt-8">
                <button onClick={onBack} className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors">
                    &larr; {language === 'en' ? ' Back to Dashboard' : ' ड्यासबोर्डमा फर्कनुहोस्'}
                </button>
            </div>
        </div>
    );
};

export default ManageProjectsPage;
