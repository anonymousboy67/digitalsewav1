import FreelancerCard from '../components/FreelancerCard'
import { Search, Filter } from 'lucide-react'

const allFreelancers = [
  {
    id: 1,
    name: 'Anil Kumar Shrestha',
    title: 'Video Editor & Motion Graphics',
    location: 'Kathmandu',
    rating: 4.9,
    reviews: 45,
    projects: 67,
    hourlyRate: '1500-2500',
    avatar: '👨‍💻',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    verified: true
  },
  {
    id: 2,
    name: 'Priya Maharjan',
    title: 'Graphic Designer',
    location: 'Lalitpur',
    rating: 4.8,
    reviews: 38,
    projects: 52,
    hourlyRate: '1200-2000',
    avatar: '👩‍🎨',
    skills: ['Photoshop', 'Illustrator', 'Figma'],
    verified: true
  },
  {
    id: 3,
    name: 'Rajesh Tamang',
    title: 'Professional Photographer',
    location: 'Pokhara',
    rating: 5.0,
    reviews: 29,
    projects: 34,
    hourlyRate: '2000-3500',
    avatar: '📸',
    skills: ['Portrait', 'Wedding', 'Product'],
    verified: true
  },
  {
    id: 4,
    name: 'Sunita Rai',
    title: 'Full Stack Developer',
    location: 'Kathmandu',
    rating: 4.7,
    reviews: 31,
    projects: 41,
    hourlyRate: '2500-4000',
    avatar: '💻',
    skills: ['React', 'Node.js', 'MongoDB'],
    verified: true
  },
]

export default function FreelancersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">प्रतिभा खोज्नुहोस्</h1>
          <p className="text-xl text-orange-100">Find Talented Freelancers</p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search freelancers by name, skill..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
              </div>
              <button className="bg-white text-red-600 px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                खोज्नुहोस्
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {allFreelancers.length} Freelancers Available
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allFreelancers.map(freelancer => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      </div>
    </main>
  )
}