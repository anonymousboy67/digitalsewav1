
import React, { useMemo } from 'react';
import type { Language, Project, Freelancer } from '../types';
import ProjectCard from '../components/ProjectCard';
import FreelancerCard from '../components/FreelancerCard';

interface SearchResultsPageProps {
    language: Language;
    searchQuery: string;
    projects: Project[];
    freelancers: Freelancer[];
    clientProjectSkills?: Set<string>;
    onViewProject: (project: Project) => void;
    onViewProfile: (freelancer: Freelancer) => void;
    savedProjects: Set<string>;
    onToggleSaveProject: (projectId: string) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ language, searchQuery, projects, freelancers, clientProjectSkills, onViewProject, onViewProfile, savedProjects, onToggleSaveProject }) => {

    const query = searchQuery.toLowerCase();

    const filteredProjects = useMemo(() => {
        if (!query) return [];
        return projects.filter(project => 
            (project?.title?.[language] || '').toLowerCase().includes(query) ||
            (project?.skills || []).some(skill => (skill || '').toLowerCase().includes(query))
        );
    }, [query, language, projects]);

    const filteredFreelancers = useMemo(() => {
        if (!query) return [];
        return freelancers.filter(freelancer =>
            (freelancer?.name || '').toLowerCase().includes(query) ||
            (freelancer?.title?.[language] || '').toLowerCase().includes(query)
        );
    }, [query, language, freelancers]);

    const totalResults = filteredProjects.length + filteredFreelancers.length;

    return (
        <div className="space-y-10 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    {language === 'en' ? 'Search Results' : 'खोज परिणामहरू'}
                </h1>
                <p className="mt-1 text-gray-500">
                    {language === 'en' 
                        ? `Found ${totalResults} results for "${searchQuery}"` 
                        : `"${searchQuery}" को लागि ${totalResults} परिणामहरू फेला पर्यो`}
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
                    {language === 'en' ? `Projects (${filteredProjects.length})` : `परियोजनाहरू (${filteredProjects.length})`}
                </h2>
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
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
                    <p className="text-gray-500 py-4">{language === 'en' ? 'No matching projects found.' : 'कुनै मिल्दो परियोजनाहरू फेला परेनन्।'}</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
                    {language === 'en' ? `Freelancers (${filteredFreelancers.length})` : `स्वतन्त्रकर्ताहरू (${filteredFreelancers.length})`}
                </h2>
                {filteredFreelancers.length > 0 ? (
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
                ) : (
                     <p className="text-gray-500 py-4">{language === 'en' ? 'No matching freelancers found.' : 'कुनै मिल्दो स्वतन्त्रकर्ताहरू फेला परेनन्।'}</p>
                )}
            </section>
        </div>
    );
};

export default SearchResultsPage;
