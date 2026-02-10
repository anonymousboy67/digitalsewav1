'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Filter, Plus } from 'lucide-react'

const categories = [
  { id: 'all', name: 'सबै', nameEn: 'All', icon: '🎨' },
  { id: 'design', name: 'डिजाइन', nameEn: 'Design', icon: '🎨' },
  { id: 'video', name: 'भिडियो', nameEn: 'Video', icon: '🎥' },
  { id: 'photography', name: 'फोटो', nameEn: 'Photo', icon: '📷' },
  { id: 'music', name: 'संगीत', nameEn: 'Music', icon: '🎵' },
  { id: 'web', name: 'वेब', nameEn: 'Web', icon: '💻' },
  { id: 'writing', name: 'लेखन', nameEn: 'Writing', icon: '✍️' }
]

interface Project {
  _id: string;
  title: { en: string; np: string };
  description: { en: string; np: string };
  budget: number;
  deadline: string;
  skills: string[];
  category: string;
  isUrgent: boolean;
  status: string;
  client: { name: string; email: string };
  createdAt: string;
}

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isClient = (session?.user as any)?.role === 'client';

  useEffect(() => {
    fetchProjects()
  }, [selectedCategory])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''
      const res = await fetch(`/api/projects?status=open${categoryParam}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }

      setProjects(data.projects || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">परियोजनाहरू खोज्नुहोस्</h1>
              <p className="text-xl text-orange-100">Browse Projects</p>
            </div>
            {isClient && (
              <Link
                href="/projects/new"
                className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                <Plus size={20} />
                Post Project
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow-md sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="text-red-600 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory !== 'all'
                ? 'No projects in this category yet.'
                : 'Be the first to post a project!'}
            </p>
            {isClient && (
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all"
              >
                <Plus size={20} />
                Post a Project
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {projects.length} Project{projects.length !== 1 ? 's' : ''} Found
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold">
                <Filter size={18} />
                Filter
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div key={project._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    {project.isUrgent && (
                      <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Urgent / तत्काल
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title.en}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.title.np}</p>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description.en}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className="text-gray-500 text-xs">+{project.skills.length - 3} more</span>
                      )}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">Rs. {project.budget.toLocaleString()}</p>
                          <p className="text-gray-500 text-sm">{project.deadline}</p>
                        </div>
                        <Link
                          href={`/projects/${project._id}`}
                          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-700 hover:to-orange-600 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
