'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];

const availabilityOptions = [
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'not_available', label: 'Not Available' },
];

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [profileId, setProfileId] = useState('');
  const [formData, setFormData] = useState({
    titleEn: '',
    titleNp: '',
    bioEn: '',
    bioNp: '',
    skills: '',
    hourlyRate: '',
    experience: 'intermediate',
    availability: 'available',
    location: '',
    languages: '',
    website: '',
    linkedin: '',
    github: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/freelancers/me');
      const data = await res.json();

      if (!data.hasProfile) {
        router.push('/profile/create');
        return;
      }

      const profile = data.freelancer;
      setProfileId(profile._id);
      setFormData({
        titleEn: profile.title.en || '',
        titleNp: profile.title.np || '',
        bioEn: profile.bio.en || '',
        bioNp: profile.bio.np || '',
        skills: profile.skills?.join(', ') || '',
        hourlyRate: profile.hourlyRate?.toString() || '',
        experience: profile.experience || 'intermediate',
        availability: profile.availability || 'available',
        location: profile.location || '',
        languages: profile.languages?.join(', ') || '',
        website: profile.socialLinks?.website || '',
        linkedin: profile.socialLinks?.linkedin || '',
        github: profile.socialLinks?.github || '',
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  if (status === 'loading' || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if ((session?.user as any)?.role !== 'freelancer') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Only freelancers can edit their profile.</p>
          <Link href="/dashboard" className="text-red-600 hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const languagesArray = formData.languages
        .split(',')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (skillsArray.length === 0) {
        throw new Error('At least one skill is required');
      }

      const res = await fetch(`/api/freelancers/${profileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: {
            en: formData.titleEn,
            np: formData.titleNp,
          },
          bio: {
            en: formData.bioEn,
            np: formData.bioNp,
          },
          skills: skillsArray,
          hourlyRate: parseInt(formData.hourlyRate),
          experience: formData.experience,
          availability: formData.availability,
          location: formData.location || undefined,
          languages: languagesArray,
          socialLinks: {
            website: formData.website || undefined,
            linkedin: formData.linkedin || undefined,
            github: formData.github || undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      router.push('/profile?updated=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <Link
              href="/profile"
              className="text-red-600 hover:text-red-700 flex items-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Profile
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
            <p className="text-gray-600 mt-1">आफ्नो प्रोफाइल सम्पादन गर्नुहोस्</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Professional Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title (English) *
                </label>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  required
                  value={formData.titleEn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="titleNp" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title (Nepali) *
                </label>
                <input
                  type="text"
                  id="titleNp"
                  name="titleNp"
                  required
                  value={formData.titleNp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="bioEn" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio (English) *
                </label>
                <textarea
                  id="bioEn"
                  name="bioEn"
                  required
                  rows={4}
                  value={formData.bioEn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="bioNp" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio (Nepali) *
                </label>
                <textarea
                  id="bioNp"
                  name="bioNp"
                  required
                  rows={4}
                  value={formData.bioNp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated) *
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Hourly Rate and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate (Rs.) *
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  required
                  min="100"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Availability and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {availabilityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Languages */}
            <div>
              <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                Languages (comma separated)
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Social Links */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/profile"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-lg hover:from-red-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
