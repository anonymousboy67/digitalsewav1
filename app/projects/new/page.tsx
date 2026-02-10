'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const categories = [
  { value: 'design', label: 'Design', labelNp: 'डिजाइन' },
  { value: 'video', label: 'Video & Animation', labelNp: 'भिडियो र एनिमेशन' },
  { value: 'photography', label: 'Photography', labelNp: 'फोटोग्राफी' },
  { value: 'music', label: 'Music & Audio', labelNp: 'संगीत र अडियो' },
  { value: 'web', label: 'Web Development', labelNp: 'वेब विकास' },
  { value: 'writing', label: 'Writing', labelNp: 'लेखन' },
  { value: 'other', label: 'Other', labelNp: 'अन्य' },
];

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner', labelNp: 'शुरुवात' },
  { value: 'intermediate', label: 'Intermediate', labelNp: 'मध्यम' },
  { value: 'expert', label: 'Expert', labelNp: 'विशेषज्ञ' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleNp: '',
    descriptionEn: '',
    descriptionNp: '',
    budget: '',
    deadline: '',
    skills: '',
    category: 'other',
    difficulty: 'intermediate',
    location: '',
    isUrgent: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in or not a client
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!session?.user) {
    router.push('/login');
    return null;
  }

  if ((session.user as any).role !== 'client') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Only clients can post projects.</p>
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
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
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

      if (skillsArray.length === 0) {
        throw new Error('At least one skill is required');
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: {
            en: formData.titleEn,
            np: formData.titleNp,
          },
          description: {
            en: formData.descriptionEn,
            np: formData.descriptionNp,
          },
          budget: parseInt(formData.budget),
          deadline: formData.deadline,
          skills: skillsArray,
          category: formData.category,
          difficulty: formData.difficulty,
          location: formData.location || undefined,
          isUrgent: formData.isUrgent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      router.push('/projects?created=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <Link
              href="/projects"
              className="text-red-600 hover:text-red-700 flex items-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Post a New Project</h1>
            <p className="text-gray-600 mt-1">नयाँ परियोजना पोस्ट गर्नुहोस्</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title (English) *
                </label>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  required
                  value={formData.titleEn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Logo Design for Restaurant"
                />
              </div>
              <div>
                <label htmlFor="titleNp" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title (Nepali) *
                </label>
                <input
                  type="text"
                  id="titleNp"
                  name="titleNp"
                  required
                  value={formData.titleNp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="उदाहरण: रेस्टुरेन्टको लागो डिजाइन"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English) *
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  required
                  rows={4}
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Describe your project requirements..."
                />
              </div>
              <div>
                <label htmlFor="descriptionNp" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Nepali) *
                </label>
                <textarea
                  id="descriptionNp"
                  name="descriptionNp"
                  required
                  rows={4}
                  value={formData.descriptionNp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="आफ्नो परियोजनाको आवश्यकताहरू वर्णन गर्नुहोस्..."
                />
              </div>
            </div>

            {/* Budget and Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (Rs.) *
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  required
                  min="100"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 25000"
                />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline *
                </label>
                <input
                  type="text"
                  id="deadline"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 2 Weeks or 15 Days"
                />
              </div>
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label} / {cat.labelNp}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {difficultyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} / {level.labelNp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills (comma separated) *
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Logo Design, Illustrator, Photoshop"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Kathmandu, Nepal"
              />
            </div>

            {/* Urgent Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                checked={formData.isUrgent}
                onChange={handleChange}
                className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isUrgent" className="ml-3 text-gray-700">
                This is an urgent project (तत्काल परियोजना)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/projects"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-lg hover:from-red-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Posting...' : 'Post Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
