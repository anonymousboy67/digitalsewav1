import { MapPin, Star, Briefcase, CheckCircle } from 'lucide-react'

interface FreelancerCardProps {
  freelancer: {
    id: number
    name: string
    title: string
    location: string
    rating: number
    reviews: number
    projects: number
    hourlyRate: string
    avatar: string
    skills: string[]
    verified: boolean
  }
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-400 hover:shadow-2xl transition-all p-6 card-hover">
      {/* Avatar & Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all">
          {freelancer.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
              {freelancer.name}
            </h3>
            {freelancer.verified && (
              <CheckCircle size={18} className="text-green-500 fill-green-100" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3 font-medium">{freelancer.title}</p>
          
          {/* Rating & Location */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-yellow-700">{freelancer.rating}</span>
              <span className="text-gray-600">({freelancer.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={14} className="text-blue-600" />
              <span className="font-semibold">{freelancer.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.map((skill, i) => (
          <span 
            key={i} 
            className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-orange-200"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between py-4 border-t-2 border-b-2 border-gray-100 mb-4">
        <div>
          <div className="text-xs text-gray-600 mb-1">प्रति घण्टा</div>
          <div className="font-bold text-green-600 text-lg">₨{freelancer.hourlyRate}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600 mb-1">परियोजनाहरू</div>
          <div className="font-bold text-gray-900 text-lg flex items-center gap-1">
            <Briefcase size={16} className="text-blue-600" />
            {freelancer.projects}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105">
        प्रोफाइल हेर्नुहोस् →
      </button>
    </div>
  )
}