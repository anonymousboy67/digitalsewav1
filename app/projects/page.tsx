'use client'

import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Filter, Search } from 'lucide-react'

const categories = [
  { id: 'all', name: 'सबै', icon: '🎨' },
  { id: 'design', name: 'डिजाइन', icon: '🎨' },
  { id: 'video', name: 'भिडियो', icon: '🎥' },
  { id: 'photo', name: 'फोटो', icon: '📷' },
  { id: 'music', name: 'संगीत', icon: '🎵' },
  { id: 'web', name: 'वेब', icon: '💻' },
  { id: 'writing', name: 'लेखन', icon: '✍️' }
]

const allProjects = [
  {
    id: 1,
    title: 'Wedding Video Editing',
    titleNp: 'विवाह भिडियो सम्पादन',
    category: 'video',
    budget: '25000-35000',
    location: 'Kathmandu',
    deadline: '5 days',
    proposals: 12,
    isUrgent: true,
    client: 'Ramesh Sharma',
    description: 'Professional video editor needed',
    skills: ['Premiere Pro', 'Color Grading']
  },
  {
    id: 2,
    title: 'Restaurant Logo',
    titleNp: 'रेस्टुरेन्ट लोगो',
    category: 'design',
    budget: '8000-15000',
    location: 'Pokhara',
    deadline: '3 days',
    proposals: 8,
    isUrgent: false,
    client: 'Sita Enterprises',
    description: 'Modern logo design',
    skills: ['Logo Design', 'Illustrator']
  },
  // Add more projects...
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = allProjects.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    (searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">परियोजनाहरू खोज्नुहोस्</h1>
          <p className="text-xl text-orange-100">Browse Projects</p>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProjects.length} Projects Found
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}