import Hero from './components/Hero'
import Link from 'next/link'
import ProjectCard from './components/ProjectCard'
import FreelancerCard from './components/FreelancerCard'
import { ChevronRight, Sparkles, Zap, Shield, Users } from 'lucide-react'

const categories = [
  { id: 'design', name: 'डिजाइन', icon: '🎨', nameEn: 'Design', gradient: 'from-pink-500 to-rose-500' },
  { id: 'video', name: 'भिडियो', icon: '🎥', nameEn: 'Video', gradient: 'from-red-500 to-orange-500' },
  { id: 'photo', name: 'फोटो', icon: '📷', nameEn: 'Photography', gradient: 'from-orange-500 to-amber-500' },
  { id: 'music', name: 'संगीत', icon: '🎵', nameEn: 'Music', gradient: 'from-amber-500 to-yellow-500' },
  { id: 'web', name: 'वेब', icon: '💻', nameEn: 'Web Dev', gradient: 'from-yellow-500 to-lime-500' },
  { id: 'writing', name: 'लेखन', icon: '✍️', nameEn: 'Writing', gradient: 'from-lime-500 to-green-500' },
]

const featuredProjects = [
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
    description: 'Professional video editor needed for 3-hour wedding footage',
    skills: ['Premiere Pro', 'Color Grading', 'Motion Graphics']
  },
  {
    id: 2,
    title: 'Restaurant Logo Design',
    titleNp: 'रेस्टुरेन्ट लोगो',
    category: 'design',
    budget: '8000-15000',
    location: 'Pokhara',
    deadline: '3 days',
    proposals: 8,
    isUrgent: false,
    client: 'Sita Enterprises',
    description: 'Modern logo design for new restaurant',
    skills: ['Logo Design', 'Illustrator', 'Branding']
  },
  {
    id: 3,
    title: 'Product Photography',
    titleNp: 'उत्पादन फोटो',
    category: 'photo',
    budget: '15000-20000',
    location: 'Lalitpur',
    deadline: '7 days',
    proposals: 15,
    isUrgent: false,
    client: 'Nepal Handicrafts',
    description: '50+ handicraft items for e-commerce',
    skills: ['Photography', 'Editing', 'Lighting']
  },
]

const topFreelancers = [
  {
    id: 1,
    name: 'Anil Shrestha',
    title: 'Video Editor',
    location: 'Kathmandu',
    rating: 4.9,
    reviews: 45,
    projects: 67,
    hourlyRate: '1500-2500',
    avatar: '👨‍💻',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
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
    title: 'Photographer',
    location: 'Pokhara',
    rating: 5.0,
    reviews: 29,
    projects: 34,
    hourlyRate: '2000-3500',
    avatar: '📸',
    skills: ['Portrait', 'Wedding', 'Product'],
    verified: true
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Categories Section with Nepali Vibes */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              लोकप्रिय श्रेणीहरू
            </h2>
            <p className="text-xl text-gray-600">Popular Categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/projects?category=${cat.id}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-8 text-center transition-all hover:scale-110 hover:rotate-3 hover:shadow-2xl relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shine"></div>
                  
                  <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="font-bold text-white text-lg mb-1">{cat.name}</div>
                  <div className="text-sm text-white/90">{cat.nameEn}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Projects</h2>
              <p className="text-xl text-red-600">विशेष परियोजनाहरू</p>
            </div>
            <Link 
              href="/projects"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              सबै हेर्नुहोस् <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Top Freelancers</h2>
              <p className="text-xl text-red-600">उत्कृष्ट फ्रीलान्सरहरू</p>
            </div>
            <Link 
              href="/freelancers"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              सबै हेर्नुहोस् <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topFreelancers.map(freelancer => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-red-700 text-white relative overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🕉️</div>
          <div className="absolute bottom-10 right-10 text-6xl">🙏</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">🪔</div>
          <div className="absolute top-1/3 right-1/4 text-4xl">🎭</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">कसरी काम गर्छ?</h2>
            <p className="text-2xl text-orange-100">How DigitalSewa Works</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                step: '१', 
                title: 'परियोजना पोस्ट गर्नुहोस्', 
                titleEn: 'Post Your Project',
                desc: 'के चाहिन्छ वर्णन गर्नुहोस् र बजेट सेट गर्नुहोस्',
                icon: <Sparkles className="w-12 h-12" />
              },
              { 
                step: '२', 
                title: 'प्रस्तावहरू प्राप्त गर्नुहोस्', 
                titleEn: 'Get Proposals',
                desc: 'प्रतिभाशाली फ्रीलान्सरहरूबाट प्रस्तावहरू हेर्नुहोस्',
                icon: <Users className="w-12 h-12" />
              },
              { 
                step: '३', 
                title: 'सहयोग र भुक्तानी', 
                titleEn: 'Collaborate & Pay',
                desc: 'सुरक्षित रूपमा सँगै काम गर्नुहोस् र भुक्तानी गर्नुहोस्',
                icon: <Shield className="w-12 h-12" />
              }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 bg-white text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl">
                  {item.icon}
                </div>
                <div className="text-5xl font-bold mb-3 text-orange-200">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-orange-100 font-medium mb-2">{item.titleEn}</p>
                <p className="text-orange-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            आज नै सुरु गर्नुहोस्!
          </h2>
          <p className="text-xl text-gray-600 mb-8">Start Your Journey Today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-105">
              🎨 I'm a Freelancer
            </button>
            <button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-105">
              💼 I'm Hiring
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}