
import React, { useState, useMemo } from 'react';
import type { Language, Project, ProjectStatus } from '../types';
import ProjectCard from '../components/ProjectCard';
import { SearchIcon } from '../components/icons';

interface ProjectsPageProps {
    language: Language;
    projects: Project[];
    onViewProject: (project: Project) => void;
    savedProjects: Set<string>;
    onToggleSaveProject: (projectId: string) => void;
}

const statusFilters: { id: 'All' | ProjectStatus; label: { en: string; np: string } }[] = [
    { id: 'All', label: { en: 'All', np: 'सबै' } },
    { id: 'Open', label: { en: 'Open', np: 'खुला' } },
    { id: 'In Progress', label: { en: 'In Progress', np: 'प्रगतिमा' } },
    { id: 'Completed', label: { en: 'Completed', np: 'सम्पन्न' } },
];

const ProjectsPage: React.FC<ProjectsPageProps> = ({ language, projects, onViewProject, savedProjects, onToggleSaveProject }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | ProjectStatus>('All');
    const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

    const allSkills = useMemo(() => {
        const skills = new Set<string>();
        projects.forEach(p => p.skills.forEach(s => skills.add(s)));
        return Array.from(skills).sort();
    }, [projects]);

    const handleSkillToggle = (skill: string) => {
        setSelectedSkills(prevSkills => {
            const newSkills = new Set(prevSkills);
            if (newSkills.has(skill)) {
                newSkills.delete(skill);
            } else {
                newSkills.add(skill);
            }
            return newSkills;
        });
    };

    const filteredProjects = useMemo(() => {
        let tempProjects = projects;

        // 1. Filter by status
        if (statusFilter !== 'All') {
            tempProjects = tempProjects.filter(project => project?.status === statusFilter);
        }

        // 2. Filter by search query (title or skill)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            tempProjects = tempProjects.filter(project => 
                (project?.title?.[language] || '').toLowerCase().includes(query) ||
                (project?.skills || []).some(skill => (skill || '').toLowerCase().includes(query))
            );
        }
        
        // 3. Filter by selected skills
        if (selectedSkills.size > 0) {
            tempProjects = tempProjects.filter(project => 
                project && project.skills.some(skill => selectedSkills.has(skill))
            );
        }

        return tempProjects;
    }, [searchQuery, language, projects, statusFilter, selectedSkills]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    {language === 'en' ? 'Browse Projects' : 'परियोजनाहरू ब्राउज गर्नुहोस्'}
                </h1>
                 <p className="mt-1 text-gray-500">
                    {language === 'en' ? `Found ${filteredProjects.length} opportunities.` : `${filteredProjects.length} अवसरहरू फेला पर्यो।`}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'en' ? 'Search by title or skill...' : 'शीर्षक वा सीप द्वारा खोज्नुहोस्...'}
                        className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-flex flex-wrap items-center gap-2">
                    {statusFilters.map(filter => (
                        <button 
                            key={filter.id}
                            onClick={() => setStatusFilter(filter.id)}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                                statusFilter === filter.id 
                                    ? 'bg-green-600 text-white shadow' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {filter.label[language]}
                        </button>
                    ))}
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">{language === 'en' ? 'Filter by Skill' : 'सीप अनुसार फिल्टर गर्नुहोस्'}</h3>
                    <div className="flex items-center gap-2 pb-2 -mx-4 px-4 overflow-x-auto no-scrollbar">
                        {allSkills.map(skill => (
                            <button
                                key={skill}
                                onClick={() => handleSkillToggle(skill)}
                                className={`flex-shrink-0 px-3 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                                    selectedSkills.has(skill)
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default ProjectsPage;
