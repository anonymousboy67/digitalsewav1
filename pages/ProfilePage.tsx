
import React, { useState } from 'react';
import type { Language, Project, KycStatus, KycData } from '../types';
import ProjectCard from '../components/ProjectCard';
import { BookmarkIcon, UsersIcon, ShieldCheckIcon, BriefcaseIcon } from '../components/icons';
import KycForm from '../components/KycForm';
import { clientData, freelancersData } from '../data/mockData';

interface ProfilePageProps {
    language: Language;
    portal: 'freelancer' | 'client' | null;
    savedProjects: string[];
    allProjects: Project[];
    onViewProject: (project: Project) => void;
    onToggleSaveProject: (projectId: string) => void;
}

const statusConfig = {
    'Not Verified': {
        text: { en: 'Not Verified', np: 'प्रमाणित नगरिएको' },
        color: 'text-red-600',
        bg: 'bg-red-100',
    },
    'Pending': {
        text: { en: 'Pending Review', np: 'समीक्षाको लागि बाँकी' },
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
    },
    'Verified': {
        text: { en: 'Verified', np: 'प्रमाणित' },
        color: 'text-green-600',
        bg: 'bg-green-100',
    }
};

const ProfilePage: React.FC<ProfilePageProps> = ({ language, portal, savedProjects, allProjects, onViewProject, onToggleSaveProject }) => {
    
    const [isKycFormOpen, setIsKycFormOpen] = useState(false);
    const [kycStatus, setKycStatus] = useState<KycStatus>('Not Verified');

    const savedProjectDetails = allProjects.filter(p => savedProjects.includes(p.id));

    const handleKycSubmit = (data: KycData) => {
        console.log("KYC Data Submitted:", data);
        setIsKycFormOpen(false);
        setKycStatus('Pending');
        // In a real app, you would send this to a server.
        // Simulate a review period:
        setTimeout(() => {
            // This would be replaced by a server response
            if (data.documentNumber !== 'fail') {
                setKycStatus('Verified');
            }
        }, 5000);
    };

    const user = {
        name: portal === 'client' ? 'Ram K.C.' : 'Sita Sharma',
        avatar: portal === 'client' ? 'https://picsum.photos/id/1005/200/200' : 'https://picsum.photos/id/1027/200/200',
        accountType: portal === 'client' 
            ? { en: 'Client Account', np: 'ग्राहक खाता' }
            : { en: 'Freelancer Account', np: 'स्वतन्त्रकर्ता खाता' },
    };

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Profile Header */}
            <section className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <img className="w-24 h-24 rounded-full object-cover" src={user.avatar} alt="User Avatar" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">{user.name}</h1>
                    <p className="text-gray-500 text-center sm:text-left">{user.accountType[language]}</p>
                    <div className="flex items-center justify-center sm:justify-start flex-wrap gap-x-4 gap-y-2 mt-2 text-gray-600">
                        <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1"/>
                            <span>{language === 'en' ? 'Kathmandu, NP' : 'काठमाडौं, नेपाल'}</span>
                        </div>
                        {portal === 'client' && (
                            <div className="flex items-center">
                                <BriefcaseIcon className="w-4 h-4 mr-1"/>
                                <span>{clientData.postedJobsHistory.length} {language === 'en' ? 'Projects Posted' : 'परियोजनाहरू पोस्ट गरियो'}</span>
                            </div>
                        )}
                        {portal === 'freelancer' && (
                             <div className="flex items-center">
                                <BriefcaseIcon className="w-4 h-4 mr-1"/>
                                <span>{freelancersData[0].completedJobsHistory.length} {language === 'en' ? 'Projects Completed' : 'परियोजनाहरू सम्पन्न'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* KYC Verification Section */}
            <section>
                 <div className="flex items-center gap-3 mb-6">
                    <ShieldCheckIcon className="w-7 h-7 text-gray-700"/>
                    <h2 className="text-2xl font-bold text-gray-800">{language === 'en' ? 'Identity Verification' : 'पहिचान प्रमाणीकरण'}</h2>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    {isKycFormOpen ? (
                        <KycForm 
                            language={language}
                            onSubmit={handleKycSubmit}
                            onCancel={() => setIsKycFormOpen(false)}
                        />
                    ) : (
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{language === 'en' ? 'Verification Status' : 'प्रमाणीकरण स्थिति'}</h3>
                                <p className={`mt-1 font-semibold text-sm px-3 py-1 rounded-full inline-block ${statusConfig[kycStatus].bg} ${statusConfig[kycStatus].color}`}>
                                    {statusConfig[kycStatus].text[language]}
                                </p>
                                <p className="text-sm text-gray-500 mt-2 max-w-md">
                                    {kycStatus === 'Not Verified' && (language === 'en' ? 'Please complete verification to build trust and access all platform features.' : 'विश्वास निर्माण गर्न र सबै प्लेटफर्म सुविधाहरू पहुँच गर्न कृपया प्रमाणीकरण पूरा गर्नुहोस्।')}
                                    {kycStatus === 'Pending' && (language === 'en' ? 'Your documents are under review. This usually takes 1-2 business days.' : 'तपाईंका कागजातहरू समीक्षामा छन्। यसमा सामान्यतया १-२ व्यापार दिन लाग्छ।')}
                                    {kycStatus === 'Verified' && (language === 'en' ? 'Your identity has been successfully verified. Thank you for helping keep our community secure.' : 'तपाईंको पहिचान सफलतापूर्वक प्रमाणित भएको छ। हाम्रो समुदायलाई सुरक्षित राख्न मद्दत गर्नुभएकोमा धन्यवाद।')}
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                {kycStatus === 'Not Verified' && (
                                     <button onClick={() => setIsKycFormOpen(true)} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                                        {language === 'en' ? 'Start Verification' : 'प्रमाणीकरण सुरु गर्नुहोस्'}
                                    </button>
                                )}
                                {kycStatus === 'Pending' && (
                                     <button className="bg-gray-300 text-gray-600 font-bold py-2 px-6 rounded-lg cursor-not-allowed">
                                        {language === 'en' ? 'Under Review' : 'समीक्षामा'}
                                    </button>
                                )}
                                {kycStatus === 'Verified' && (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <ShieldCheckIcon className="w-8 h-8"/>
                                        <span className="font-bold text-lg">{language === 'en' ? 'Verified' : 'प्रमाणित'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Saved Projects Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <BookmarkIcon className="w-7 h-7 text-gray-700"/>
                    <h2 className="text-2xl font-bold text-gray-800">{language === 'en' ? 'Saved Projects' : 'सेभ गरिएका परियोजनाहरू'}</h2>
                </div>

                {savedProjectDetails.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {savedProjectDetails.map(project => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                language={language}
                                onViewDetails={() => onViewProject(project)}
                                isSaved={true}
                                onSave={() => onToggleSaveProject(project.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                         <BookmarkIcon className="w-12 h-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">{language === 'en' ? 'No saved projects' : 'कुनै सेभ गरिएका परियोजनाहरू छैनन्'}</h3>
                        <p className="mt-1 text-sm text-gray-500">{language === 'en' ? 'You haven’t saved any projects yet.' : 'तपाईंले अहिलेसम्म कुनै पनि परियोजनाहरू सेभ गर्नुभएको छैन।'}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;