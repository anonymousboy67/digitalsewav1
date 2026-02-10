import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { auth } from '@/lib/auth';
import DeleteProjectButton from './DeleteProjectButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id)
      .populate('client', 'name email')
      .lean();
    return project;
  } catch {
    return null;
  }
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  const session = await auth();

  if (!project) {
    notFound();
  }

  const isOwner = session?.user?.id === (project.client as any)?._id?.toString();

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
          <div className="flex items-start justify-between">
            <div>
              {project.isUrgent && (
                <span className="inline-block bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  Urgent / तत्काल
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title.en}</h1>
              <p className="text-xl text-orange-100">{project.title.np}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'open' ? 'bg-green-500' :
              project.status === 'in_progress' ? 'bg-blue-500' :
              project.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
            }`}>
              {project.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{project.description.en}</p>
                <hr className="my-4" />
                <p className="text-gray-600">{project.description.np}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-4 py-2 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Project</h2>
                <div className="flex gap-4">
                  <Link
                    href={`/projects/${id}/edit`}
                    className="flex-1 text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Edit Project
                  </Link>
                  <DeleteProjectButton projectId={id} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">Budget</p>
                <p className="text-4xl font-bold text-green-600">Rs. {project.budget.toLocaleString()}</p>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Deadline</span>
                  <span className="font-semibold">{project.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold capitalize">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="font-semibold capitalize">{project.difficulty}</span>
                </div>
                {project.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold">{project.location}</span>
                  </div>
                )}
              </div>

              {!isOwner && session?.user && (session.user as any).role === 'freelancer' && project.status === 'open' && (
                <button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all">
                  Submit Proposal
                </button>
              )}
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Posted By</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {(project.client as any)?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold">{(project.client as any)?.name || 'Unknown'}</p>
                  <p className="text-gray-500 text-sm">Client</p>
                </div>
              </div>
            </div>

            {/* Posted Date */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500 text-sm">Posted on</p>
              <p className="font-semibold">
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
