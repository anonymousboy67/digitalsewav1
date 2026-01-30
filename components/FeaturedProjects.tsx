
import React from 'react';
import type { Language, Project } from '../types';
import ProjectCard from './ProjectCard';

interface FeaturedProjectsProps {
  language: Language;
  projects: Project[];
  onViewProject: (project: Project) => void;
  savedProjects: Set<string>;
  onToggleSaveProject: (projectId: string) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ language, projects, onViewProject, savedProjects, onToggleSaveProject }) => {
  // Show only first 3 projects as featured
  const featured = projects.slice(0, 3);
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{language === 'en' ? 'Featured Projects' : 'विशेष परियोजनाहरू'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featured.map(project => (
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
    </section>
  );
};

export default FeaturedProjects;
