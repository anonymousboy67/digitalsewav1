
import React, { useState } from 'react';
import type { Language, KycData } from '../types';
import { UploadIcon } from './icons';

interface KycFormProps {
    language: Language;
    onSubmit: (data: KycData) => void;
    onCancel: () => void;
}

const initialFormData: KycData = {
    fullName: '',
    dateOfBirth: '',
    address: '',
    documentType: 'Citizenship',
    documentNumber: '',
    documentFront: null,
    selfie: null,
};

const FileInput: React.FC<{
    id: string;
    label: string;
    fileName: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    language: Language;
}> = ({ id, label, fileName, onChange, language }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <label
            htmlFor={id}
            className="relative cursor-pointer bg-white rounded-md border border-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 flex items-center px-3 py-2"
        >
            <div className="flex items-center gap-3 text-gray-600">
                <UploadIcon className="w-6 h-6" />
                <span className="text-sm font-semibold">{language === 'en' ? 'Upload a file' : 'फाइल अपलोड गर्नुहोस्'}</span>
            </div>
            <input id={id} name={id} type="file" className="sr-only" onChange={onChange} />
        </label>
        {fileName && <p className="text-xs text-gray-500 mt-1 truncate">Selected: {fileName}</p>}
    </div>
);


const KycForm: React.FC<KycFormProps> = ({ language, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<KycData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, [e.target.id]: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div>
                <h3 className="text-lg font-bold text-gray-800">{language === 'en' ? 'Submit Your Information' : 'आफ्नो जानकारी पेश गर्नुहोस्'}</h3>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Please provide accurate information as it appears on your official documents.' : 'कृपया आफ्नो आधिकारिक कागजातहरूमा देखिने सही जानकारी प्रदान गर्नुहोस्।'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Full Legal Name' : 'पूरा कानूनी नाम'}</label>
                    <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Date of Birth' : 'जन्म मिति'}</label>
                    <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Permanent Address' : 'स्थायी ठेगाना'}</label>
                <input type="text" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Document Type' : 'कागजातको प्रकार'}</label>
                    <select id="documentType" value={formData.documentType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md" required>
                        <option value="Citizenship">{language === 'en' ? 'Citizenship' : 'नागरिकता'}</option>
                        <option value="Passport">{language === 'en' ? 'Passport' : 'पासपोर्ट'}</option>
                        <option value="National ID">{language === 'en' ? 'National ID Card' : 'राष्ट्रिय परिचय पत्र'}</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">{language === 'en' ? 'Document Number' : 'कागजात नम्बर'}</label>
                    <input type="text" id="documentNumber" value={formData.documentNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <FileInput
                    id="documentFront"
                    label={language === 'en' ? 'Government-Issued ID' : 'सरकारी परिचय पत्र'}
                    fileName={formData.documentFront?.name}
                    onChange={handleFileChange}
                    language={language}
                />
                <FileInput
                    id="selfie"
                    label={language === 'en' ? 'Selfie with ID' : 'ID सहितको सेल्फी'}
                    fileName={formData.selfie?.name}
                    onChange={handleFileChange}
                    language={language}
                />
            </div>
            
            <div className="flex justify-end pt-4 space-x-3">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                    {language === 'en' ? 'Cancel' : 'रद्द गर्नुहोस्'}
                </button>
                <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                    {language === 'en' ? 'Submit for Review' : 'समीक्षाको लागि पेश गर्नुहोस्'}
                </button>
            </div>
        </form>
    );
};

export default KycForm;
