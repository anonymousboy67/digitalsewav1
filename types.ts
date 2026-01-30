
import type React from 'react';

export type Language = 'en' | 'np';
export type ProjectStatus = 'Open' | 'In Progress' | 'Completed';
export type KycStatus = 'Not Verified' | 'Pending' | 'Verified';

export interface Category {
  id: string;
  name: { en: string; np: string };
  icon: React.FC<{ className?: string }>;
}

export interface Project {
  id: string;
  title: { en: string; np: string };
  description: { en: string; np: string };
  budget: number;
  deadline: string;
  location: string;
  skills: string[];
  isUrgent: boolean;
  status: ProjectStatus;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// New type for freelancer's job history
export interface CompletedJob {
  projectId: string;
  budget: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isUrgent: boolean;
  clientRating: number; // 1-5 rating from client
}

// New type for client's job history
export interface PostedJob {
  projectId: string;
  budget: number;
  freelancerRating: number; // 1-5 rating from freelancer by the hired freelancer
}

export interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  postedJobsHistory: PostedJob[];
}

export interface Freelancer {
  id: string;
  name: string;
  avatarUrl: string;
  title: { en: string; np: string };
  hourlyRate: number;
  isVerified: boolean;
  isOnline: boolean;
  skills: string[];
  completedJobsHistory: CompletedJob[];
}

export interface KycData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  documentType: 'Citizenship' | 'Passport' | 'National ID';
  documentNumber: string;
  documentFront?: File | null;
  selfie?: File | null;
}