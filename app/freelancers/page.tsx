'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, MapPin, CheckCircle } from 'lucide-react'

interface Freelancer {
  _id: string;
  user: { name: string; email: string; image?: string };
  title: { en: string; np: string };
  skills: string[];
  hourlyRate: number;
  availability: string;
  experience: string;
  location?: string;
  completedJobs: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

const experienceFilters = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFreelancers();
  }, [experienceFilter]);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      let url = '/api/freelancers?';
      if (experienceFilter) url += `experience=${experienceFilter}&`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch freelancers');
      }

      setFreelancers(data.freelancers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter locally for now, could add API search later
  };

  const filteredFreelancers = freelancers.filter((f) =>
    searchQuery === '' ||
    f.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">प्रतिभा खोज्नुहोस्</h1>
          <p className="text-xl text-orange-100">Find Talented Freelancers</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search freelancers by name, skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-red-600 px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                खोज्नुहोस्
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading...' : `${filteredFreelancers.length} Freelancer${filteredFreelancers.length !== 1 ? 's' : ''} Available`}
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold"
          >
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  {experienceFilters.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchFreelancers} className="text-red-600 hover:underline">
              Try again
            </button>
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No freelancers found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try a different search term.'
                : 'Be the first to create a freelancer profile!'}
            </p>
            <Link
              href="/profile/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all"
            >
              Create Your Profile
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Link
                key={freelancer._id}
                href={`/freelancers/${freelancer._id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Avatar and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {freelancer.user.name?.charAt(0) || 'U'}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(freelancer.availability)}`}
                      ></div>
                    </div>
                    {freelancer.isVerified && (
                      <CheckCircle className="text-blue-500" size={20} />
                    )}
                  </div>

                  {/* Name and Title */}
                  <h3 className="text-lg font-bold text-gray-900">{freelancer.user.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{freelancer.title.en}</p>

                  {/* Location */}
                  {freelancer.location && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <MapPin size={14} />
                      <span>{freelancer.location}</span>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {freelancer.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <span className="text-gray-500 text-xs">+{freelancer.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{freelancer.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm">({freelancer.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">Rs. {freelancer.hourlyRate}/hr</p>
                      <p className="text-gray-500 text-xs">{freelancer.completedJobs} jobs</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
