
import React from 'react';
import type { Language, Project, ProjectStatus } from '../types';
import { ClockIcon, CurrencyRupeeIcon, BookmarkIcon, BookmarkSolidIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  language: Language;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  onStatusChange?: (newStatus: ProjectStatus) => void;
}

const statusStyles: Record<ProjectStatus, { text: { en: string; np: string }, classes: string }> = {
    Open: { text: { en: 'Open', np: 'खुला' }, classes: 'bg-green-100 text-green-800' },
    'In Progress': { text: { en: 'In Progress', np: 'प्रगतिमा' }, classes: 'bg-blue-100 text-blue-800' },
    Completed: { text: { en: 'Completed', np: 'सम्पन्न' }, classes: 'bg-purple-100 text-purple-800' }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, language, onEdit, onDelete, onViewDetails, onSave, isSaved, onStatusChange }) => {
  if (!project) {
    return null;
  }
  
  const title = project?.title?.[language] || (language === 'en' ? 'Untitled Project' : 'शीर्षक नभएको परियोजना');
  const statusInfo = statusStyles[project.status] || { text: { en: 'Unknown', np: 'अज्ञात' }, classes: 'bg-gray-100 text-gray-800' };
  
  return (
    <div className="relative border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full">
      {onSave && (
        <button
          onClick={onSave}
          aria-label={isSaved ? (language === 'en' ? 'Unsave project' : 'परियोजना अनसेभ गर्नुहोस्') : (language === 'en' ? 'Save project' : 'परियोजना सेभ गर्नुहोस्')}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all"
        >
          {isSaved ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
        </button>
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mr-8">{title}</h3>
          <div className="flex-shrink-0 flex items-center gap-2">
            {project.isUrgent && (
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {language === 'en' ? 'Urgent' : 'तत्काल'}
              </span>
            )}
             {onEdit && onDelete && onStatusChange ? (
                 <select
                    value={project.status}
                    onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
                    onClick={(e) => e.stopPropagation()} // Prevent card click-through
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 cursor-pointer ${statusInfo.classes}`}
                    aria-label={language === 'en' ? 'Change project status' : 'परियोजना स्थिति परिवर्तन गर्नुहोस्'}
                >
                    {(Object.keys(statusStyles) as ProjectStatus[]).map(status => (
                        <option key={status} value={status}>
                            {statusStyles[status].text[language]}
                        </option>
                    ))}
                </select>
             ) : (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusInfo.classes}`}>
                    {statusInfo.text[language]}
                </span>
             )}
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
            <div className="flex items-start space-x-2 text-sm">
                <CurrencyRupeeIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-xs text-gray-500">{language === 'en' ? 'Budget' : 'बजेट'}</p>
                    <p className="font-semibold text-gray-700">Rs. {project.budget.toLocaleString()}</p>
                </div>
            </div>
            <div className="flex items-start space-x-2 text-sm">
                <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-xs text-gray-500">{language === 'en' ? 'Deadline' : 'म्याद'}</p>
                    <p className="font-semibold text-gray-700">{project.deadline}</p>
                </div>
            </div>
        </div>

        <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 3).map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {skill}
                </span>
              ))}
               {project.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      +{project.skills.length - 3} {language === 'en' ? 'more' : 'थप'}
                    </span>
                )}
            </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        {onEdit && onDelete ? (
            <div className="flex items-center justify-end space-x-2">
                 <button 
                    onClick={onDelete}
                    className="w-full sm:w-auto bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    {language === 'en' ? 'Delete' : 'मेटाउनुहोस्'}
                  </button>
                 <button 
                    onClick={onEdit}
                    className="w-full sm:w-auto bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    {language === 'en' ? 'Edit Project' : 'परियोजना सम्पादन गर्नुहोस्'}
                  </button>
            </div>
        ) : (
             <button 
                onClick={onViewDetails}
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                {language === 'en' ? 'View Details' : 'विवरण हेर्नुहोस्'}
              </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
