import { MapPin, DollarSign, Clock, Users, Zap } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    titleNp: string
    category: string
    budget: string
    location: string
    deadline: string
    proposals: number
    isUrgent: boolean
    client: string
    description: string
    skills: string[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-400 hover:shadow-2xl transition-all p-6 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            {project.isUrgent && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold animate-pulse-red">
                <Zap size={14} fill="currentColor" />
                अत्यावश्यक
              </span>
            )}
            <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
              {project.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 nepali-text font-semibold">
            {project.titleNp}
          </p>
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill, i) => (
          <span 
            key={i} 
            className="bg-gradient-to-r from-red-50 to-orange-50 text-red-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-red-200"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700 bg-green-50 px-3 py-2 rounded-lg">
          <DollarSign size={16} className="text-green-600" />
          <span className="font-bold text-green-700">₨{project.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 bg-blue-50 px-3 py-2 rounded-lg">
          <MapPin size={16} className="text-blue-600" />
          <span className="font-semibold">{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 bg-orange-50 px-3 py-2 rounded-lg">
          <Clock size={16} className="text-orange-600" />
          <span className="font-semibold">{project.deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 bg-purple-50 px-3 py-2 rounded-lg">
          <Users size={16} className="text-purple-600" />
          <span className="font-semibold">{project.proposals} बोलीहरू</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="text-gray-500">द्वारा:</span>{' '}
          <span className="font-bold text-gray-900">{project.client}</span>
        </div>
        <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2.5 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105">
          आवेदन दिनुहोस् →
        </button>
      </div>
    </div>
  )
}