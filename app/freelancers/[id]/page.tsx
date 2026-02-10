import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Freelancer from '@/models/Freelancer';
import { Star, MapPin, Clock, Globe, ExternalLink, CheckCircle, Briefcase } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getFreelancer(id: string) {
  try {
    await dbConnect();
    const freelancer = await Freelancer.findById(id)
      .populate('user', 'name email image isVerified')
      .lean();
    return freelancer;
  } catch {
    return null;
  }
}

export default async function FreelancerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const freelancer = await getFreelancer(id);

  if (!freelancer) {
    notFound();
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

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available for Work';
      case 'busy':
        return 'Currently Busy';
      default:
        return 'Not Available';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/freelancers"
            className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Freelancers
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {(freelancer.user as any)?.name?.charAt(0) || 'U'}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {(freelancer.user as any)?.name || 'Unknown'}
                  </h1>
                  {freelancer.isVerified && (
                    <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle size={16} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xl text-gray-600 mb-1">{freelancer.title.en}</p>
                <p className="text-gray-500 mb-4">{freelancer.title.np}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {freelancer.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{freelancer.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Globe size={16} />
                    <span>{freelancer.languages?.join(', ') || 'Nepali, English'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>
                      Member since{' '}
                      {new Date(freelancer.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-shrink-0 text-right">
                <p className="text-3xl font-bold text-green-600">Rs. {freelancer.hourlyRate}</p>
                <p className="text-gray-500 mb-4">/hour</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getAvailabilityColor(
                    freelancer.availability
                  )}`}
                >
                  {getAvailabilityText(freelancer.availability)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 mb-4 whitespace-pre-line">{freelancer.bio.en}</p>
              <hr className="my-4" />
              <p className="text-gray-600 whitespace-pre-line">{freelancer.bio.np}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-4 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            {freelancer.portfolio && freelancer.portfolio.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 gap-4">
                  {freelancer.portfolio.map((item: any, idx: number) => (
                    <div key={idx} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{freelancer.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({freelancer.reviewCount})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Jobs Completed</span>
                  <span className="font-bold">{freelancer.completedJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-bold text-green-600">
                    Rs. {freelancer.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-bold capitalize">{freelancer.experience}</span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Hire This Freelancer</h3>
              <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all mb-3">
                Contact Now
              </button>
              <Link
                href="/projects/new"
                className="block w-full text-center border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Post a Project
              </Link>
            </div>

            {/* Social Links */}
            {freelancer.socialLinks && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Links</h3>
                <div className="space-y-3">
                  {freelancer.socialLinks.website && (
                    <a
                      href={freelancer.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      Website
                    </a>
                  )}
                  {freelancer.socialLinks.linkedin && (
                    <a
                      href={freelancer.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      LinkedIn
                    </a>
                  )}
                  {freelancer.socialLinks.github && (
                    <a
                      href={freelancer.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      GitHub
                    </a>
                  )}
                  {freelancer.socialLinks.behance && (
                    <a
                      href={freelancer.socialLinks.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      Behance
                    </a>
                  )}
                  {freelancer.socialLinks.dribbble && (
                    <a
                      href={freelancer.socialLinks.dribbble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} />
                      Dribbble
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-12"></div>
    </main>
  );
}
