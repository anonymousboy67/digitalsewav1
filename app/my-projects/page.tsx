'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface Project {
  _id: string;
  title: { en: string; np: string };
  budget: number;
  deadline: string;
  category: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  isUrgent: boolean;
  createdAt: string;
  proposals: string[];
}

export default function MyProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      if ((session.user as any).role !== 'client') {
        router.push('/dashboard');
      } else {
        fetchMyProjects();
      }
    }
  }, [status, session, router]);

  const fetchMyProjects = async () => {
    try {
      const res = await fetch(`/api/projects?clientId=${session?.user?.id}&status=`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data.projects || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeletingId(projectId);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete project');
      }

      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Projects</h1>
              <p className="text-orange-100">मेरा परियोजनाहरू</p>
            </div>
            <Link
              href="/projects/new"
              className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              <Plus size={20} />
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchMyProjects} className="text-red-600 hover:underline">
              Try again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Post your first project to find talented freelancers.</p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all"
            >
              <Plus size={20} />
              Post a Project
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Project</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Budget</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Proposals</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Created</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{project.title.en}</p>
                          <p className="text-sm text-gray-500">{project.title.np}</p>
                          {project.isUrgent && (
                            <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                              Urgent
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-green-600">Rs. {project.budget.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">{project.proposals?.length || 0}</span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-500 text-sm">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/projects/${project._id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/projects/${project._id}/edit`}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id)}
                            disabled={deletingId === project._id}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
