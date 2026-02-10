'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit2, MapPin, Clock, Star, Briefcase, Globe, ExternalLink } from 'lucide-react';

interface FreelancerProfile {
  _id: string;
  user: { name: string; email: string; image?: string };
  title: { en: string; np: string };
  bio: { en: string; np: string };
  skills: string[];
  hourlyRate: number;
  availability: string;
  experience: string;
  location?: string;
  languages: string[];
  completedJobs: number;
  totalEarnings: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  socialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/freelancers/me');
      const data = await res.json();

      if (!data.hasProfile) {
        if ((session?.user as any)?.role === 'freelancer') {
          router.push('/profile/create');
        }
        return;
      }

      setProfile(data.freelancer);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // For clients, show a simple profile page
  if ((session?.user as any)?.role === 'client') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{session?.user?.name}</h1>
              <p className="text-gray-600">{session?.user?.email}</p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Client
              </span>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link
                href="/my-projects"
                className="block w-full text-center bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all"
              >
                View My Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Profile Found</h1>
          <p className="text-gray-600 mb-6">Create your freelancer profile to get started.</p>
          <Link
            href="/profile/create"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all"
          >
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-red-600">
                  {profile.user.name?.charAt(0) || 'U'}
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{profile.user.name}</h1>
                    {profile.isVerified && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600">{profile.title.en}</p>
                  <p className="text-gray-500">{profile.title.np}</p>
                </div>
              </div>
              <Link
                href={`/profile/edit`}
                className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 mb-4">{profile.bio.en}</p>
              <p className="text-gray-600">{profile.bio.np}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-4 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-red-600">{profile.completedJobs}</p>
                  <p className="text-gray-600 text-sm">Jobs Completed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">Rs. {profile.totalEarnings.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Total Earnings</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    <span className="text-3xl font-bold">{profile.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{profile.reviewCount} Reviews</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">Rs. {profile.hourlyRate}</p>
                  <p className="text-gray-600 text-sm">Hourly Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getAvailabilityColor(profile.availability)}`}>
                    {profile.availability.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium capitalize">{profile.experience}</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={18} />
                  <span>{profile.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {profile.socialLinks && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Links</h3>
                <div className="space-y-3">
                  {profile.socialLinks.website && (
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      Website
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      LinkedIn
                    </a>
                  )}
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Member Since */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>
                  Member since{' '}
                  {new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
