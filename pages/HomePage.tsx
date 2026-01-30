
import React, { useState, useMemo } from 'react';
import type { Language, Project, Freelancer, Client, ProjectStatus } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import FreelancerDashboard from './FreelancerDashboard';
import ClientDashboard from './ClientDashboard';
import ProjectsPage from './ProjectsPage';
import FreelancersPage from './FreelancersPage';
import PostProjectPage from './PostProjectPage';
import ManageProjectsPage from './ManageProjectsPage';
import EditProjectPage from './EditProjectPage';
import SearchResultsPage from './SearchResultsPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProfilePage from './ProfilePage';
import { projectsData, freelancersData, clientData } from '../data/mockData';


interface HomePageProps {
    language: Language;
    toggleLanguage: () => void;
    onLogout: () => void;
    portal: 'freelancer' | 'client' | null;
}

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-700">{title}</h1>
        <p className="text-gray-500 mt-2">This page is under construction.</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ language, toggleLanguage, onLogout, portal }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [freelancers] = useState<Freelancer[]>(freelancersData);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedProjects, setSavedProjects] = useState<Set<string>>(new Set());
  
  // Simulate a logged-in user for dashboard purposes
  const currentFreelancerUser = freelancersData[0]; // Sita Sharma
  const currentClientUser = clientData;
  const currentClientProjects = useMemo(() => projects.slice(0, 3), [projects]);

  const handleToggleSaveProject = (projectId: string) => {
    setSavedProjects(prev => {
        const newSet = new Set(prev);
        if (newSet.has(projectId)) {
            newSet.delete(projectId);
        } else {
            newSet.add(projectId);
        }
        return newSet;
    });
  };
  
  const clientProjectSkills = useMemo(() => {
    if (portal !== 'client') return new Set<string>();
    
    const skills = currentClientProjects.flatMap(p => p.skills);
    return new Set(skills);
  }, [portal, currentClientProjects]);
  
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('projectDetails');
  };
  
  const handleViewFreelancerProfile = (freelancer: Freelancer) => {
    alert(`This would open the profile of ${freelancer.name}`);
    // In a real app, you might set state and navigate to a new tab:
    // setSelectedFreelancer(freelancer);
    // setActiveTab('freelancerDetails');
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setActiveTab('editProject');
  };

  const handleSaveProject = (updatedProject: Project) => {
    setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setProjectToEdit(null);
    setActiveTab('manageProjects');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };
  
  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, status: newStatus } : p
      )
    );
  };

  const handleBackFromProjectDetails = () => {
    setSelectedProject(null);
    setActiveTab('projects');
  }

  const handleBackToManage = () => {
    setProjectToEdit(null);
    setActiveTab('manageProjects');
  }

  const handleSearch = (query: string) => {
      setSearchQuery(query);
      setActiveTab('searchResults');
  };

  const renderContent = () => {
    switch (activeTab) {
        case 'home':
            if (portal === 'client') {
                return <ClientDashboard 
                            language={language} 
                            onNavigate={setActiveTab}
                            currentUser={currentClientUser}
                            myProjects={currentClientProjects}
                            allFreelancers={freelancers}
                            clientProjectSkills={clientProjectSkills}
                            onViewProfile={handleViewFreelancerProfile}
                            onEditProject={handleEditProject}
                            onDeleteProject={handleDeleteProject}
                            onStatusChange={handleStatusChange}
                       />;
            }
            return <FreelancerDashboard 
                        language={language} 
                        portal={portal} 
                        onNavigate={setActiveTab} 
                        projects={projects} 
                        currentUser={currentFreelancerUser}
                        onViewProject={handleViewProject}
                        savedProjects={savedProjects}
                        onToggleSaveProject={handleToggleSaveProject}
                    />;
        case 'projects':
            return <ProjectsPage 
                        language={language} 
                        projects={projects} 
                        onViewProject={handleViewProject}
                        savedProjects={savedProjects}
                        onToggleSaveProject={handleToggleSaveProject}
                    />;
        case 'freelancers':
            return <FreelancersPage language={language} freelancers={freelancers} clientProjectSkills={clientProjectSkills} onViewProfile={handleViewFreelancerProfile} />;
        case 'messages':
            return <PlaceholderPage title="Messages" />;
        case 'contracts':
            return <PlaceholderPage title="My Contracts" />;
        case 'profile':
            return <ProfilePage
                        language={language}
                        portal={portal}
                        savedProjects={Array.from(savedProjects)}
                        allProjects={projects}
                        onViewProject={handleViewProject}
                        onToggleSaveProject={handleToggleSaveProject}
                    />;
        case 'postProject':
            return <PostProjectPage language={language} onBack={() => setActiveTab('home')} />;
        case 'manageProjects':
            return <ManageProjectsPage 
                        language={language} 
                        myProjects={currentClientProjects}
                        onBack={() => setActiveTab('home')} 
                        onEditProject={handleEditProject}
                        onDeleteProject={handleDeleteProject}
                        onStatusChange={handleStatusChange}
                    />;
        case 'editProject':
             if (projectToEdit) {
                 return <EditProjectPage 
                            language={language} 
                            project={projectToEdit}
                            onBack={handleBackToManage} 
                            onSave={handleSaveProject}
                        />;
             }
             // Fallback if no project is being edited
             setActiveTab('manageProjects');
             return null;
        case 'searchResults':
            return <SearchResultsPage 
                        language={language} 
                        searchQuery={searchQuery}
                        projects={projects}
                        freelancers={freelancers}
                        clientProjectSkills={clientProjectSkills}
                        onViewProject={handleViewProject}
                        onViewProfile={handleViewFreelancerProfile}
                        savedProjects={savedProjects}
                        onToggleSaveProject={handleToggleSaveProject}
                    />;
        case 'projectDetails':
             if (selectedProject) {
                 return <ProjectDetailsPage
                            language={language}
                            project={selectedProject}
                            freelancers={freelancers}
                            clientProjectSkills={clientProjectSkills}
                            onBack={handleBackFromProjectDetails}
                            onViewProfile={handleViewFreelancerProfile}
                        />;
             }
              // Fallback if no project is selected
             setActiveTab('projects');
             return null;
        default:
            if (portal === 'client') {
                 return <ClientDashboard 
                            language={language} 
                            onNavigate={setActiveTab}
                            currentUser={currentClientUser}
                            myProjects={currentClientProjects}
                            allFreelancers={freelancers}
                            clientProjectSkills={clientProjectSkills}
                            onViewProfile={handleViewFreelancerProfile}
                            onEditProject={handleEditProject}
                            onDeleteProject={handleDeleteProject}
                            onStatusChange={handleStatusChange}
                       />;
            }
            return <FreelancerDashboard 
                        language={language} 
                        portal={portal} 
                        onNavigate={setActiveTab} 
                        projects={projects} 
                        currentUser={currentFreelancerUser}
                        onViewProject={handleViewProject}
                        savedProjects={savedProjects}
                        onToggleSaveProject={handleToggleSaveProject}
                    />;
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header 
        language={language} 
        toggleLanguage={toggleLanguage} 
        onLogout={onLogout} 
        activeTab={activeTab}
        onTabClick={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        portal={portal}
      />
      <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full pb-24 md:pb-8">
        {renderContent()}
      </main>
      <Footer language={language} />
      <BottomNav 
        language={language}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        portal={portal}
      />
    </div>
  );
};

export default HomePage;
